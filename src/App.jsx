import { useState } from 'react';

const PARTIDOS = [
  { grupo: 'I', home: 'Norway', away: 'France', fecha: 'Jun 26' },
  { grupo: 'I', home: 'Senegal', away: 'Iraq', fecha: 'Jun 26' },
  { grupo: 'H', home: 'Cape Verde', away: 'Saudi Arabia', fecha: 'Jun 26' },
  { grupo: 'H', home: 'Uruguay', away: 'Spain', fecha: 'Jun 26' },
  { grupo: 'G', home: 'Egypt', away: 'Iran', fecha: 'Jun 26' },
  { grupo: 'G', home: 'New Zealand', away: 'Belgium', fecha: 'Jun 26' },
  { grupo: 'J', home: 'Algeria', away: 'Austria', fecha: 'Jun 27' },
  { grupo: 'J', home: 'Jordan', away: 'Argentina', fecha: 'Jun 27' },
  { grupo: 'K', home: 'Colombia', away: 'Portugal', fecha: 'Jun 27' },
  { grupo: 'K', home: 'DR Congo', away: 'Uzbekistan', fecha: 'Jun 27' },
  { grupo: 'L', home: 'Panama', away: 'England', fecha: 'Jun 27' },
  { grupo: 'L', home: 'Croatia', away: 'Ghana', fecha: 'Jun 27' },
  {
    grupo: 'R32',
    home: 'USA',
    away: 'Bosnia and Herzegovina',
    fecha: 'Jun 29',
  },
];

const BANDERAS = {
  Norway: '🇳🇴',
  France: '🇫🇷',
  Senegal: '🇸🇳',
  Iraq: '🇮🇶',
  'Cape Verde': '🇨🇻',
  'Saudi Arabia': '🇸🇦',
  Uruguay: '🇺🇾',
  Spain: '🇪🇸',
  Egypt: '🇪🇬',
  Iran: '🇮🇷',
  'New Zealand': '🇳🇿',
  Belgium: '🇧🇪',
  Algeria: '🇩🇿',
  Austria: '🇦🇹',
  Jordan: '🇯🇴',
  Argentina: '🇦🇷',
  Colombia: '🇨🇴',
  Portugal: '🇵🇹',
  'DR Congo': '🇨🇩',
  Uzbekistan: '🇺🇿',
  Panama: '🇵🇦',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Croatia: '🇭🇷',
  Ghana: '🇬🇭',
  USA: '🇺🇸',
  'Bosnia and Herzegovina': '🇧🇦',
};

const PREDICCIONES = {
  'Norway-France': {
    poisson: [24.2, 28.2, 47.3],
    xgb: [36.5, 25.9, 37.6],
    lambda: [0.86, 1.32],
  },
  'Senegal-Iraq': {
    poisson: [45.7, 34.5, 19.7],
    xgb: [43.3, 28.2, 28.5],
    lambda: [1.01, 0.55],
  },
  'Cape Verde-Saudi Arabia': {
    poisson: [32.6, 34.9, 32.5],
    xgb: [44.9, 29.2, 25.9],
    lambda: [0.82, 0.81],
  },
  'Uruguay-Spain': {
    poisson: [19.4, 27.3, 53.0],
    xgb: [24.5, 26.3, 49.2],
    lambda: [0.73, 1.41],
  },
  'Egypt-Iran': {
    poisson: [25.2, 34.6, 40.1],
    xgb: [32.9, 34.7, 32.4],
    lambda: [0.68, 0.94],
  },
  'New Zealand-Belgium': {
    poisson: [18.3, 24.3, 56.7],
    xgb: [19.1, 18.6, 62.3],
    lambda: [0.82, 1.66],
  },
  'Algeria-Austria': {
    poisson: [44.8, 28.2, 26.8],
    xgb: [31.9, 34.9, 33.1],
    lambda: [1.31, 0.94],
  },
  'Jordan-Argentina': {
    poisson: [18.3, 28.8, 52.7],
    xgb: [13.0, 17.2, 69.8],
    lambda: [0.65, 1.32],
  },
  'Colombia-Portugal': {
    poisson: [26.0, 32.0, 41.9],
    xgb: [34.1, 29.4, 36.5],
    lambda: [0.77, 1.06],
  },
  'DR Congo-Uzbekistan': {
    poisson: [30.3, 33.8, 35.9],
    xgb: [46.7, 27.5, 25.7],
    lambda: [0.81, 0.91],
  },
  'Panama-England': {
    poisson: [14.9, 25.4, 59.1],
    xgb: [22.0, 26.7, 51.3],
    lambda: [0.62, 1.54],
  },
  'Croatia-Ghana': {
    poisson: [38.2, 31.9, 29.8],
    xgb: [48.3, 28.4, 23.3],
    lambda: [1.02, 0.86],
  },
  'USA-Bosnia and Herzegovina': {
    poisson: [40.2, 28.5, 31.3],
    xgb: [26.0, 28.0, 46.0],
    lambda: [1.12, 0.98],
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
            {partido.grupo === 'R32'
              ? '🏆 ROUND OF 32'
              : `GRUPO ${partido.grupo}`}{' '}
            · {partido.fecha}
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
              &nbsp;|&nbsp;
              {ba} {partido.away}: <strong>{data.lambda[1]}</strong> goles
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
              Modelos entrenados con 49,000 partidos internacionales desde 1872.
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
          Modelos de Machine Learning — XGBoost + Poisson
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>
        <h2 style={{ color: '#374151', marginBottom: 16 }}>🗓️ Partidos</h2>
        {PARTIDOS.map((p, i) => (
          <MatchCard key={i} partido={p} />
        ))}
      </div>
    </div>
  );
}
