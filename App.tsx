
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Target, BookOpen, Calendar, Settings, 
  LogOut, Monitor, Radio, ShieldAlert, History
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import Analyzer from './views/Analyzer';
import Journal from './views/Journal';
import CalendarView from './views/Calendar';
import SettingsView from './views/Settings';
import Terminal from './views/Terminal';
import SignalsFeed from './views/SignalsFeed';
import Backtest from './views/Backtest';
import Login from './views/Login';
import { JournalEntry } from './types';
import { translations } from './translations';

interface AppContextType {
  lang: 'en' | 'pt';
  setLang: (l: 'en' | 'pt') => void;
  t: typeof translations.en;
  isAuth: boolean;
  setIsAuth: (b: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (b: boolean) => void;
  journal: JournalEntry[];
  saveToJournal: (entry: JournalEntry) => void;
  updateJournal: (entries: JournalEntry[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);
export const useApp = () => useContext(AppContext)!;

const NavItems = [
  { path: '/', icon: LayoutDashboard, label: "Painel" },
  { path: '/terminal', icon: Monitor, label: "Live" },
  { path: '/analyzer', icon: Target, label: "Scanner" },
  { path: '/backtest', icon: History, label: "Backtest" },
  { path: '/signals', icon: Radio, label: "Radar" },
  { path: '/journal', icon: BookOpen, label: "Ledger" },
  { path: '/settings', icon: Settings, label: "Ajustes" },
];

const Sidebar = () => {
  const location = useLocation();
  const { setIsAuth, setIsAdmin } = useApp();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('tradelens_auth');
    localStorage.removeItem('tradelens_admin');
    localStorage.removeItem('tradelens_persistent_auth');
    setIsAuth(false);
    setIsAdmin(false);
  };

  return (
    <aside className="hidden lg:flex w-64 bg-zinc-950 border-r border-zinc-900 flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8 border-b border-zinc-900 mb-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-white to-emerald-500 bg-clip-text text-transparent italic tracking-tighter">
          TradeLens<span className="text-white">.AI</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {NavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all group ${
              isActive(item.path) ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-3 text-zinc-700 hover:text-rose-500 text-[10px] font-black uppercase transition-all">
          <LogOut size={14} /> <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-900 px-2 pt-2 pb-safe z-50 flex justify-around items-center h-20">
      {NavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
            isActive(item.path) ? 'text-emerald-500' : 'text-zinc-600'
          }`}
        >
          <item.icon size={20} strokeWidth={isActive(item.path) ? 3 : 2} />
          <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('tradelens_auth');
    const persistentAuth = localStorage.getItem('tradelens_persistent_auth');

    if (savedAuth === 'true' || persistentAuth === 'true') {
      setIsAuth(true);
      setIsAdmin(true);
    }
    
    const savedJournal = localStorage.getItem('tradelens_journal');
    if (savedJournal) setJournal(JSON.parse(savedJournal));
    setLoadingSession(false);
  }, []);

  const saveToJournal = (entry: JournalEntry) => {
    const updated = [entry, ...journal].slice(0, 50);
    setJournal(updated);
    localStorage.setItem('tradelens_journal', JSON.stringify(updated));
  };

  const updateJournal = (entries: JournalEntry[]) => {
    setJournal(entries);
    localStorage.setItem('tradelens_journal', JSON.stringify(entries));
  };

  const contextValue = useMemo(() => ({
    lang: 'pt' as const,
    setLang: () => {},
    t: translations.pt,
    isAuth,
    setIsAuth: (val: boolean) => {
      setIsAuth(val);
      localStorage.setItem('tradelens_auth', String(val));
      if (!val) {
        localStorage.removeItem('tradelens_persistent_auth');
      }
    },
    isAdmin,
    setIsAdmin: (val: boolean) => {
      setIsAdmin(val);
      localStorage.setItem('tradelens_admin', String(val));
    },
    journal,
    saveToJournal,
    updateJournal
  }), [isAuth, isAdmin, journal]);

  if (loadingSession) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 font-black animate-pulse uppercase tracking-[1em]">TradeLens</div>;

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/*" element={
            isAuth ? (
              <div className="flex min-h-screen bg-[#050505] pb-20 lg:pb-0">
                <Sidebar />
                <div className="flex-1 lg:ml-64 p-4 lg:p-12 w-full max-w-full overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<Dashboard journal={journal} />} />
                    <Route path="/signals" element={<SignalsFeed />} />
                    <Route path="/terminal" element={<Terminal />} />
                    <Route path="/analyzer" element={<Analyzer onSave={saveToJournal} />} />
                    <Route path="/backtest" element={<Backtest />} />
                    <Route path="/journal" element={<Journal entries={journal} onUpdate={updateJournal} />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
                <BottomNav />
              </div>
            ) : <Navigate to="/login" replace />
          } />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
