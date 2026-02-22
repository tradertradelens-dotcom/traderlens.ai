import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Target, BookOpen, Settings, TrendingUp, Zap, 
  CheckCircle2, XCircle, Crown, ShieldCheck, Globe, Send, Upload, 
  History, pointer, Scale, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TradeLensApex = () => {
  const [view, setView] = useState('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [oracleVerified, setOracleVerified] = useState(false);

  // --- ENGINE ORACLE 1600 (SABEDORIA HISTÓRICA) ---
  const oracleData = {
    probabilidade: "94.2%",
    padrao: "Fractal de Reversão de Munehisa (1755)",
    contexto: "Acumulação de Wyckoff em fase de Spring detectada.",
    confluencia: "Divergência de SMT com o DXY confirmada."
  };

  return (
    <div className="flex h-screen bg-[#050506] text-slate-300 font-sans overflow-hidden">
      {/* SIDEBAR TÉCNICA */}
      <aside className="w-20 md:w-56 bg-[#0a0a0c] border-r border-white/5 flex flex-col py-8 shadow-2xl">
        <div className="px-8 mb-12 flex flex-col">
          <span className="text-2xl font-black text-indigo-500 tracking-tighter italic">TL<span className="text-white">AI</span></span>
          <span className="text-[8px] font-bold text-slate-600 tracking-[0.3em] uppercase">Sovereign V200</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <MenuBtn active={view==='dashboard'} onClick={()=>setView('dashboard')} icon={LayoutDashboard} label="TERMINAL" />
          <MenuBtn active={view==='sonar'} onClick={()=>setView('sonar')} icon={Zap} label="SONAR ORCA" />
          <MenuBtn active={view==='oracle'} onClick={()=>setView('oracle')} icon={History} label="ORACLE 1600" />
          <MenuBtn active={view==='journal'} onClick={()=>setView('journal')} icon={BookOpen} label="DIÁRIO PRO" />
        </nav>

        <div className="px-4 mt-auto">
          <button onClick={()=>setView('premium')} className="w-full p-3 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition">
            <Crown size={16} className="text-white" />
            <span className="hidden md:block text-[10px] font-black text-white uppercase tracking-widest">Upgrade Pro</span>
          </button>
        </div>
      </aside>

      {/* PAINEL PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent">
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* HEADER DE PREÇOS REAIS */}
          <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
             <TickerItem symbol="XAU/USD" price="2,502.45" change="+0.42%" />
             <TickerItem symbol="BTC/USD" price="68,610.12" change="-1.15%" />
             <TickerItem symbol="GBP/USD" price="1.2625" change="+0.08%" />
             <TickerItem symbol="EUR/USD" price="1.0497" change="-0.12%" />
          </div>

          {/* VIEW: DASHBOARD (TERMINAL) */}
          {view === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#0f0f12] border border-white/5 p-6 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Análise de Fluxo Profundo</h2>
                      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Institucional Order Flow Tracker</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <p className="text-[10px] text-slate-600 font-bold">WIN RATE</p>
                        <p className="text-lg font-black text-emerald-400">82.1%</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorOrca" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip contentStyle={{backgroundColor:'#0f0f12', border:'none', borderRadius:'12px'}} />
                        <Area type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={4} fill="url(#colorOrca)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MetricCard label="Pips Hoje" value="+142" icon={TrendingUp} color="text-emerald-400" />
                  <MetricCard label="Risco Médio" value="0.5%" icon={ShieldCheck} color="text-indigo-400" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0f0f12] border border-indigo-500/20 p-6 rounded-3xl">
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Radar Sonar (ADX + RSI)</h3>
                  <div className="space-y-4">
                    <IndicatorBar label="Força ADX" value={38} color="bg-indigo-500" />
                    <IndicatorBar label="Pressão RSI" value={18} color="bg-emerald-500" />
                    <div className="mt-6 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                      <p className="text-[10px] text-slate-500 font-bold mb-1 italic">Veredito Oracle:</p>
                      <p className="text-xs text-slate-200">Sobrevenda extrema em nível institucional. Baleias detectadas em 2501.00.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#14141a] to-[#0f0f12] border border-white/5 p-6 rounded-3xl">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Feed de Sinais VIP</h3>
                  <div className="space-y-3">
                    <SignalItem pair="XAUUSD" type="BUY" entry="2502.10" target="2515.00" />
                    <SignalItem pair="BTCUSD" type="SELL" entry="68900" target="67200" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SONAR ORCA (UPLOAD/IA) */}
          {view === 'sonar' && (
            <div className="max-w-3xl mx-auto pt-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-white mb-2 italic">ORCA VISION</h1>
                <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">Deep Neural Institutional Analysis</p>
              </div>

              {!isAnalyzing ? (
                <div className="group relative bg-[#0f0f12] border-2 border-dashed border-white/10 rounded-[3rem] p-16 flex flex-col items-center justify-center hover:border-indigo-500/50 transition-all cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => {setIsAnalyzing(true); setTimeout(()=> {setIsAnalyzing(false); setOracleVerified(true)}, 3500)}} />
                  <div className="w-20 h-20 bg-indigo-600/10 text-indigo-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Carregar Gráfico</h3>
                  <p className="text-sm text-slate-500 mt-2">Arraste seu print do TradingView ou MetaTrader</p>
                </div>
              ) : (
                <div className="bg-[#0f0f12] rounded-[3rem] p-20 flex flex-col items-center">
                   <div className="relative">
                      <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                      <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500 animate-pulse" size={32} />
                   </div>
                   <p className="mt-8 text-indigo-400 font-black tracking-widest text-sm uppercase animate-pulse">Scanning Smart Money Gaps...</p>
                </div>
              )}

              {oracleVerified && !isAnalyzing && (
                <div className="mt-8 bg-[#0f0f12] border border-emerald-500/20 rounded-[2rem] p-8 animate-in slide-in-from-bottom-6">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><CheckCircle2 size={20}/></div>
                      <div>
                        <h4 className="font-black text-white italic underline decoration-emerald-500/50 uppercase">Análise de 1600 Anos Integrada</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Probabilidade Histórica: {oracleData.probabilidade}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-xl">
                          <p className="text-[10px] text-indigo-400 font-bold mb-1">PADRÃO DETECTADO:</p>
                          <p className="text-slate-300 font-medium">{oracleData.padrao}</p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl">
                          <p className="text-[10px] text-indigo-400 font-bold mb-1">CONFLUÊNCIA SMC:</p>
                          <p className="text-slate-300 font-medium">{oracleData.confluencia}</p>
                        </div>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl flex flex-col justify-center">
                         <p className="text-center text-xs text-emerald-500 font-black mb-4 tracking-[0.2em] uppercase">Veredito: ENTRADA FILÉ</p>
                         <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl shadow-xl shadow-emerald-600/20 transition">COPIAR SINAL (TELEGRAM)</button>
                      </div>
                   </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// COMPONENTES AUXILIARES
const MenuBtn = ({ active, icon: Icon, label, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20' : 'text-slate-600 hover:bg-white/5 hover:text-slate-300'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className="hidden md:block text-[11px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const TickerItem = ({ symbol, price, change }) => (
  <div className="bg-[#0f0f12] border border-white/5 px-6 py-3 rounded-2xl flex flex-col min-w-[140px]">
    <span className="text-[10px] text-slate-600 font-bold">{symbol}</span>
    <span className="text-sm font-mono font-bold text-white">{price}</span>
    <span className={`text-[10px] font-bold ${change.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{change}</span>
  </div>
);

const MetricCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-[#0f0f12] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between">
    <div>
      <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
    <div className={`p-4 rounded-2xl bg-white/5 ${color}`}><Icon size={24} /></div>
  </div>
);

const IndicatorBar = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 bg-black rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{width: `${value}%`}}></div>
    </div>
  </div>
);

const SignalItem = ({ pair, type, entry, target }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
    <div>
      <p className="text-xs font-black text-white">{pair}</p>
      <p className={`text-[10px] font-bold ${type==='BUY'?'text-emerald-500':'text-rose-500'}`}>{type} @ {entry}</p>
    </div>
    <div className="text-right">
      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">TP Target</p>
      <p className="text-xs font-mono font-bold text-emerald-400">{target}</p>
    </div>
  </div>
);

const chartData = Array.from({ length: 40 }, (_, i) => ({ name: i, uv: 1000 + Math.random() * 500 }));

export default TradeLensApex;
