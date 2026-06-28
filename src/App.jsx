import { useState } from 'react';

const PARTIDOS = [
  { grupo: 'R32', home: 'South Africa', away: 'Canada', fecha: 'Jun 28' },
  { grupo: 'R32', home: 'Brazil', away: 'Japan', fecha: 'Jun 29' },
  { grupo: 'R32', home: 'Germany', away: 'Paraguay', fecha: 'Jun 29' },
  { grupo: 'R32', home: 'Netherlands', away: 'Morocco', fecha: 'Jun 29' },
  { grupo: 'R32', home: 'Ivory Coast', away: 'Norway', fecha: 'Jun 30' },
  { grupo: 'R32', home: 'France', away: 'Sweden', fecha: 'Jun 30' },
  { grupo: 'R32', home: 'Mexico', away: 'Ecuador', fecha: 'Jun 30' },
  { grupo: 'R32', home: 'USA', away: 'Bosnia and Herzegovina', fecha: 'Jul 1' },
  { grupo: 'R32', home: 'Belgium', away: 'Senegal', fecha: 'Jul 1' },
  { grupo: 'R32', home: 'Australia', away: 'Egypt', fecha: 'Jul 1' },
  { grupo: 'R32', home: 'Spain', away: 'Austria', fecha: 'Jul 3' },
  { grupo: 'R32', home: 'Algeria', away: 'Switzerland', fecha: 'Jul 3' },
  { grupo: 'R32', home: 'Argentina', away: 'Cape Verde', fecha: 'Jul 4' },
  { grupo: 'R32', home: 'Colombia', away: 'Ghana', fecha: 'Jul 4' },
  { grupo: 'R32', home: 'Portugal', away: 'Croatia', fecha: 'Jul 4' },
  { grupo: 'R32', home: 'England', away: 'DR Congo', fecha: 'Jul 4' },
];

const BANDERAS = {
  'South Africa': '🇿🇦',
  Canada: '🇨🇦',
  Brazil: '🇧🇷',
  Japan: '🇯🇵',
  Germany: '🇩🇪',
  Paraguay: '🇵🇾',
  Netherlands: '🇳🇱',
  Morocco: '🇲🇦',
  'Ivory Coast': '🇨🇮',
  Norway: '🇳🇴',
  France: '🇫🇷',
  Sweden: '🇸🇪',
  Mexico: '🇲🇽',
  Ecuador: '🇪🇨',
  USA: '🇺🇸',
  'Bosnia and Herzegovina': '🇧🇦',
  Belgium: '🇧🇪',
  Senegal: '🇸🇳',
  Australia: '🇦🇺',
  Egypt: '🇪🇬',
  Spain: '🇪🇸',
  Austria: '🇦🇹',
  Algeria: '🇩🇿',
  Switzerland: '🇨🇭',
  Argentina: '🇦🇷',
  'Cape Verde': '🇨🇻',
  Colombia: '🇨🇴',
  Ghana: '🇬🇭',
  Portugal: '🇵🇹',
  Croatia: '🇭🇷',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'DR Congo': '🇨🇩',
};

const PREDICCIONES = {
  'South Africa-Canada': {
    poisson: [33.1, 34.9, 32.0],
    xgb: [26.7, 24.2, 49.1],
    lambda: [0.83, 0.81],
  },
  'Brazil-Japan': {
    poisson: [42.6, 29.7, 27.6],
    xgb: [41.3, 18.7, 39.9],
    lambda: [1.19, 0.89],
  },
  'Germany-Paraguay': {
    poisson: [63.8, 21.4, 13.6],
    xgb: [73.9, 13.4, 12.7],
    lambda: [1.88, 0.72],
  },
  'Netherlands-Morocco': {
    poisson: [29.4, 31.6, 39.0],
    xgb: [46.7, 22.5, 30.8],
    lambda: [0.86, 1.04],
  },
  'Ivory Coast-Norway': {
    poisson: [41.4, 30.4, 28.1],
    xgb: [38.7, 29.5, 31.8],
    lambda: [1.14, 0.88],
  },
  'France-Sweden': {
    poisson: [47.9, 27.7, 24.1],
    xgb: [65.6, 14.3, 20.1],
    lambda: [1.36, 0.88],
  },
  'Mexico-Ecuador': {
    poisson: [41.3, 31.8, 26.7],
    xgb: [59.9, 29.2, 10.9],
    lambda: [1.06, 0.79],
  },
  'USA-Bosnia and Herzegovina': {
    poisson: [40.0, 29.0, 31.0],
    xgb: [26.0, 28.0, 46.0],
    lambda: [1.1, 0.95],
  },
  'Belgium-Senegal': {
    poisson: [38.4, 31.3, 30.2],
    xgb: [63.6, 17.2, 19.2],
    lambda: [1.05, 0.89],
  },
  'Australia-Egypt': {
    poisson: [29.8, 31.9, 38.2],
    xgb: [30.4, 27.6, 42.0],
    lambda: [0.86, 1.02],
  },
  'Spain-Austria': {
    poisson: [55.7, 25.4, 18.4],
    xgb: [38.5, 34.7, 26.7],
    lambda: [1.57, 0.77],
  },
  'Algeria-Switzerland': {
    poisson: [42.1, 28.6, 29.0],
    xgb: [43.5, 27.6, 28.9],
    lambda: [1.24, 0.98],
  },
  'Argentina-Cape Verde': {
    poisson: [53.4, 30.1, 16.3],
    xgb: [79.0, 10.3, 10.7],
    lambda: [1.24, 0.55],
  },
  'Colombia-Ghana': {
    poisson: [38.3, 35.1, 26.6],
    xgb: [61.3, 25.7, 12.9],
    lambda: [0.9, 0.69],
  },
  'Portugal-Croatia': {
    poisson: [46.9, 28.3, 24.6],
    xgb: [59.2, 17.2, 23.6],
    lambda: [1.32, 0.87],
  },
  'England-DR Congo': {
    poisson: [53.3, 29.4, 17.1],
    xgb: [51.2, 34.6, 14.2],
    lambda: [1.28, 0.59],
  },
};

function ProbabilityBars({ home, away, data }) {
  const [modelo, setModelo] = useState('xgb');
  const probs = modelo === 'xgb' ? data.xgb : data.poisson;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setModelo('xgb')}
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            background: modelo === 'xgb' ? '#3b82f6' : '#e5e7eb',
            color: modelo === 'xgb' ? 'white' : '#374151',
            fontWeight: 600,
          }}
        >
          XGBoost
        </button>
        <button
          onClick={() => setModelo('poisson')}
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            background: modelo === 'poisson' ? '#3b82f6' : '#e5e7eb',
            color: modelo === 'poisson' ? 'white' : '#374151',
            fontWeight: 600,
          }}
        >
          Poisson
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        {[
          { label: `${home} gana`, prob: probs[0], color: '#3b82f6' },
          { label: 'Empate', prob: probs[1], color: '#9ca3af' },
          { label: `${away} gana`, prob: probs[2], color: '#ef4444' },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
              {item.prob.toFixed(1)}%
            </div>
            <div
              style={{
                height: item.prob * 2,
                background: item.color,
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.5s',
              }}
            />
            <div style={{ fontSize: 11, marginTop: 6, color: '#6b7280' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchCard({ partido }) {
  const [abierto, setAbierto] = useState(false);
  const key = `${partido.home}-${partido.away}`;
  const data = PREDICCIONES[key];
  const bh = BANDERAS[partido.home] || '🏳️';
  const ba = BANDERAS[partido.away] || '🏳️';
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>
            🏆 ROUND OF 32 · {partido.fecha}
          </span>
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
            {bh} {partido.home} vs {partido.away} {ba}
          </div>
        </div>
        {data && (
          <button
            onClick={() => setAbierto(!abierto)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              background: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {abierto ? 'Cerrar' : 'Ver predicción'}
          </button>
        )}
      </div>
      {abierto && data && (
        <div
          style={{
            marginTop: 20,
            borderTop: '1px solid #f0f0f0',
            paddingTop: 20,
          }}
        >
          <h3 style={{ marginBottom: 16, color: '#374151' }}>
            📊 Probabilidad de resultado
          </h3>
          <ProbabilityBars
            home={partido.home}
            away={partido.away}
            data={data}
          />
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              marginTop: 16,
            }}
          >
            <h4 style={{ margin: '0 0 8px', color: '#374151' }}>
              ⚽ Goles esperados
            </h4>
            <p style={{ margin: 0, color: '#6b7280' }}>
              {bh} {partido.home}: <strong>{data.lambda[0]}</strong> goles
              &nbsp;|&nbsp; {ba} {partido.away}:{' '}
              <strong>{data.lambda[1]}</strong> goles
            </p>
          </div>
          <div
            style={{
              background: '#fffbeb',
              borderRadius: 12,
              padding: 16,
              marginTop: 12,
              border: '1px solid #fde68a',
            }}
          >
            <h4 style={{ margin: '0 0 8px', color: '#92400e' }}>
              🤖 ¿Qué significa esto?
            </h4>
            <p style={{ margin: 0, color: '#78350f', fontSize: 14 }}>
              Modelos entrenados con 49,000 partidos desde 1872.
              <br />
              <br />
              <strong>XGBoost</strong> analiza forma reciente — goles metidos,
              recibidos y victorias en últimos 10 partidos.
              <br />
              <br />
              <strong>Poisson</strong> calcula goles esperados según ataque vs
              defensa del rival.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f1f5f9',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
          padding: '40px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 48 }}>⚽</div>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 800 }}>
          Predictor Mundial FIFA 2026
        </h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          🏆 Round of 32 — Machine Learning: XGBoost + Poisson
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>
        <h2 style={{ color: '#374151', marginBottom: 16 }}>
          🗓️ Partidos Round of 32
        </h2>
        {PARTIDOS.map((p, i) => (
          <MatchCard key={i} partido={p} />
        ))}
      </div>
    </div>
  );
}
