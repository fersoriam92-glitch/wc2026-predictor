import { useState } from 'react'

const PARTIDOS_R16 = [
  { grupo: 'R16', home: 'Canada',      away: 'Morocco',   fecha: 'Jul 4' },
  { grupo: 'R16', home: 'Paraguay',    away: 'France',    fecha: 'Jul 4' },
  { grupo: 'R16', home: 'Brazil',      away: 'Norway',    fecha: 'Jul 5' },
  { grupo: 'R16', home: 'Mexico',      away: 'England',   fecha: 'Jul 5' },
  { grupo: 'R16', home: 'Spain',       away: 'Portugal',  fecha: 'Jul 6' },
  { grupo: 'R16', home: 'Belgium',     away: 'USA',       fecha: 'Jul 6' },
  { grupo: 'R16', home: 'Egypt',       away: 'Argentina', fecha: 'Jul 7' },
  { grupo: 'R16', home: 'Switzerland', away: 'Colombia',  fecha: 'Jul 7' },
]

const BANDERAS = {
  'Canada':'🇨🇦','Morocco':'🇲🇦','Paraguay':'🇵🇾','France':'🇫🇷',
  'Brazil':'🇧🇷','Norway':'🇳🇴','Mexico':'🇲🇽','England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Spain':'🇪🇸','Portugal':'🇵🇹','Belgium':'🇧🇪','USA':'🇺🇸',
  'Egypt':'🇪🇬','Argentina':'🇦🇷','Switzerland':'🇨🇭','Colombia':'🇨🇴',
}

const PREDICCIONES = {
  'Canada-Morocco':    {poisson:[22.7,33.4,43.9],xgb:[36.4,32.3,31.2],lambda:[0.65,1.03]},
  'Paraguay-France':   {poisson:[12.8,24.9,61.8],xgb:[24.1,25.2,50.8],lambda:[0.55,1.57]},
  'Brazil-Norway':     {poisson:[54.8,26.9,18.0],xgb:[51.8,19.4,28.8],lambda:[1.45,0.70]},
  'Mexico-England':    {poisson:[22.7,30.7,46.4],xgb:[44.6,35.2,20.3],lambda:[0.72,1.17]},
  'Spain-Portugal':    {poisson:[40.2,29.3,30.3],xgb:[36.0,36.0,28.0],lambda:[1.17,0.98]},
  'Belgium-USA':       {poisson:[45.0,28.0,27.0],xgb:[81.5,5.0,13.5], lambda:[1.20,0.90]},
  'Egypt-Argentina':   {poisson:[27.1,33.6,39.3],xgb:[23.1,28.2,48.8],lambda:[0.75,0.97]},
  'Switzerland-Colombia':{poisson:[30.9,32.7,36.3],xgb:[41.3,23.9,34.8],lambda:[0.86,0.96]},
}

const MEXICO_PATH = [
  {ronda:'8vos de Final', rival:'England',  fecha:'Jul 5',  p_ganar:62.1, p_rival:37.9, p_llegar:62.1},
  {ronda:'Cuartos',       rival:'Brazil',   fecha:'Jul 9',  p_ganar:59.5, p_rival:40.5, p_llegar:36.9},
  {ronda:'Semifinal',     rival:'France',   fecha:'Jul 14', p_ganar:47.8, p_rival:52.2, p_llegar:17.7},
  {ronda:'Final',         rival:'Portugal', fecha:'Jul 19', p_ganar:55.2, p_rival:44.8, p_llegar:9.7},
]

function ProbabilityBars({home,away,data}){
  const [modelo,setModelo]=useState('xgb')
  const probs=modelo==='xgb'?data.xgb:data.poisson
  return(
    <div style={{marginBottom:24}}>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <button onClick={()=>setModelo('xgb')} style={{padding:'4px 12px',borderRadius:20,border:'none',cursor:'pointer',background:modelo==='xgb'?'#3b82f6':'#e5e7eb',color:modelo==='xgb'?'white':'#374151',fontWeight:600}}>XGBoost</button>
        <button onClick={()=>setModelo('poisson')} style={{padding:'4px 12px',borderRadius:20,border:'none',cursor:'pointer',background:modelo==='poisson'?'#3b82f6':'#e5e7eb',color:modelo==='poisson'?'white':'#374151',fontWeight:600}}>Poisson</button>
      </div>
      <div style={{display:'flex',gap:12,alignItems:'flex-end'}}>
        {[{label:`${home} gana`,prob:probs[0],color:'#3b82f6'},{label:'Empate',prob:probs[1],color:'#9ca3af'},{label:`${away} gana`,prob:probs[2],color:'#ef4444'}].map((item,i)=>(
          <div key={i} style={{flex:1,textAlign:'center'}}>
            <div style={{fontWeight:700,fontSize:18,marginBottom:4}}>{item.prob.toFixed(1)}%</div>
            <div style={{height:item.prob*2,background:item.color,borderRadius:'6px 6px 0 0',transition:'height 0.5s'}}/>
            <div style={{fontSize:11,marginTop:6,color:'#6b7280'}}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchCard({partido}){
  const [abierto,setAbierto]=useState(false)
  const key=`${partido.home}-${partido.away}`
  const data=PREDICCIONES[key]
  const bh=BANDERAS[partido.home]||'🏳️'
  const ba=BANDERAS[partido.away]||'🏳️'
  return(
    <div style={{background:'white',borderRadius:16,padding:20,marginBottom:16,boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <span style={{fontSize:12,color:'#9ca3af',fontWeight:600}}>⚔️ 8VOS DE FINAL · {partido.fecha}</span>
          <div style={{fontSize:20,fontWeight:700,marginTop:4}}>{bh} {partido.home} vs {partido.away} {ba}</div>
        </div>
        {data&&<button onClick={()=>setAbierto(!abierto)} style={{padding:'8px 16px',borderRadius:20,border:'none',background:'#3b82f6',color:'white',cursor:'pointer',fontWeight:600}}>{abierto?'Cerrar':'Ver predicción'}</button>}
      </div>
      {abierto&&data&&(
        <div style={{marginTop:20,borderTop:'1px solid #f0f0f0',paddingTop:20}}>
          <h3 style={{marginBottom:16,color:'#374151'}}>📊 Probabilidad de resultado</h3>
          <ProbabilityBars home={partido.home} away={partido.away} data={data}/>
          <div style={{background:'#f8fafc',borderRadius:12,padding:16,marginTop:16}}>
            <h4 style={{margin:'0 0 8px',color:'#374151'}}>⚽ Goles esperados</h4>
            <p style={{margin:0,color:'#6b7280'}}>{bh} {partido.home}: <strong>{data.lambda[0]}</strong> | {ba} {partido.away}: <strong>{data.lambda[1]}</strong></p>
          </div>
          <div style={{background:'#fffbeb',borderRadius:12,padding:16,marginTop:12,border:'1px solid #fde68a'}}>
            <h4 style={{margin:'0 0 8px',color:'#92400e'}}>🤖 ¿Qué significa esto?</h4>
            <p style={{margin:0,color:'#78350f',fontSize:14}}>Modelos entrenados con 49,000 partidos desde 1872.<br/><br/><strong>XGBoost</strong> analiza forma reciente.<br/><br/><strong>Poisson</strong> calcula goles esperados según ataque vs defensa.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function MexicoPath(){
  const [abierto,setAbierto]=useState(false)
  return(
    <div style={{background:'linear-gradient(135deg,#006847,#ce1126)',borderRadius:16,padding:20,marginBottom:24,color:'white'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:24,fontWeight:800}}>🇲🇽 Camino de México al título</div>
          <div style={{opacity:0.9,marginTop:4}}>Probabilidad acumulada por ronda</div>
        </div>
        <button onClick={()=>setAbierto(!abierto)} style={{padding:'8px 16px',borderRadius:20,border:'2px solid white',background:'transparent',color:'white',cursor:'pointer',fontWeight:600}}>{abierto?'Cerrar':'Ver análisis'}</button>
      </div>
      {abierto&&(
        <div style={{marginTop:20}}>
          {MEXICO_PATH.map((r,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.15)',borderRadius:12,padding:16,marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{r.ronda} — vs {BANDERAS[r.rival]||'🏳️'} {r.rival}</div>
                  <div style={{opacity:0.8,fontSize:13}}>{r.fecha}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:22,fontWeight:800}}>{r.p_llegar}%</div>
                  <div style={{opacity:0.8,fontSize:12}}>prob. de llegar</div>
                </div>
              </div>
              <div style={{marginTop:12,background:'rgba(255,255,255,0.2)',borderRadius:8,height:8}}>
                <div style={{background:'white',borderRadius:8,height:8,width:`${r.p_llegar}%`,transition:'width 1s'}}/>
              </div>
              <div style={{marginTop:8,display:'flex',justifyContent:'space-between',fontSize:13}}>
                <span>🇲🇽 México gana este partido: <strong>{r.p_ganar}%</strong></span>
                <span>{BANDERAS[r.rival]||'🏳️'} {r.rival}: <strong>{r.p_rival}%</strong></span>
              </div>
            </div>
          ))}
          <div style={{background:'rgba(255,255,255,0.2)',borderRadius:12,padding:16,textAlign:'center',marginTop:8}}>
            <div style={{fontSize:14,opacity:0.9}}>Probabilidad de ganar el Mundial</div>
            <div style={{fontSize:42,fontWeight:900}}>9.7%</div>
            <div style={{fontSize:13,opacity:0.8}}>Basado en XGBoost + simulación de bracket</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App(){
  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',fontFamily:'system-ui, sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1e3a5f,#3b82f6)',padding:'40px 20px',textAlign:'center',color:'white'}}>
        <div style={{fontSize:48}}>⚽</div>
        <h1 style={{margin:'8px 0',fontSize:32,fontWeight:800}}>Predictor Mundial FIFA 2026</h1>
        <p style={{margin:0,opacity:0.8}}>⚔️ 8vos de Final — Machine Learning: XGBoost + Poisson</p>
      </div>
      <div style={{maxWidth:700,margin:'0 auto',padding:'24px 16px'}}>
        <MexicoPath/>
        <h2 style={{color:'#374151',marginBottom:16}}>⚔️ 8vos de Final</h2>
        {PARTIDOS_R16.map((p,i)=>(<MatchCard key={i} partido={p}/>))}
      </div>
    </div>
  )
}
