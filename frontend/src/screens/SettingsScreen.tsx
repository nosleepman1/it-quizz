import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Volume2, VolumeX, Moon, Sun, 
  Bell, BellOff, Info, Code 
} from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();

  // Settings states initialized with localStorage or defaults
  const [themeMode, setThemeMode] = useState<'system' | 'blue' | 'white'>(
    (localStorage.getItem('themeMode') as 'system' | 'blue' | 'white') || 'system'
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    localStorage.getItem('soundEnabled') !== 'false'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem('notificationsEnabled') === 'true'
  );

  const changeTheme = (theme: 'system' | 'blue' | 'white') => {
    setThemeMode(theme);
    localStorage.setItem('themeMode', theme);
    
    const html = document.documentElement;
    html.classList.remove('theme-blue', 'theme-white', 'dark');
    
    if (theme === 'blue') {
      html.classList.add('theme-blue', 'dark');
    } else if (theme === 'white') {
      html.classList.add('theme-white');
    } else {
      html.classList.add('dark');
    }
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem('soundEnabled', String(nextVal));
  };

  const toggleNotifications = () => {
    const nextVal = !notificationsEnabled;
    setNotificationsEnabled(nextVal);
    localStorage.setItem('notificationsEnabled', String(nextVal));
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between font-sans">
      {/* Grid pattern backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-muted hover:text-game-text active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Réglages
          </span>
          <div className="w-9" />
        </header>

        {/* Configurations List */}
        <div className="space-y-4">
          {/* Theme Selector Toggle */}
          <div className="bg-game-card border border-game-border rounded-xl p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-game-border flex items-center justify-center text-game-primary shrink-0">
                {themeMode === 'white' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-game-text uppercase tracking-wide">Thème Visuel</h4>
                <p className="text-[9px] text-game-muted mt-0.5 font-medium">Basculez entre nos trois déclinaisons</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-lg border border-game-border">
              {(['system', 'blue', 'white'] as const).map((t) => {
                const label = { system: 'Système', blue: 'Marine', white: 'Blanc' }[t];
                const active = themeMode === t;
                return (
                  <button
                    key={t}
                    onClick={() => changeTheme(t)}
                    className={`py-1.5 rounded text-[8px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      active 
                        ? 'bg-game-primary text-game-bg shadow-sm' 
                        : 'text-game-muted hover:text-game-text'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound settings toggle */}
          <div className="bg-game-card border border-game-border rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-game-border flex items-center justify-center text-game-primary shrink-0">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-game-text uppercase tracking-wide">Effets Sonores</h4>
                <p className="text-[9px] text-game-muted mt-0.5 font-medium">Sons de buzzer, clic et réussite</p>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`px-3.5 py-1.5 border rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                soundEnabled 
                  ? 'bg-game-primary/10 border-game-primary/20 text-game-primary hover:bg-game-primary hover:text-game-bg' 
                  : 'bg-white/5 border-white/10 text-game-muted hover:text-game-text'
              }`}
            >
              {soundEnabled ? 'Activé' : 'Désactivé'}
            </button>
          </div>

          {/* Notification settings toggle */}
          <div className="bg-game-card border border-game-border rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-game-border flex items-center justify-center text-game-primary shrink-0">
                {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-game-text uppercase tracking-wide">Rappels Quotidiens</h4>
                <p className="text-[9px] text-game-muted mt-0.5 font-medium">Gardez votre streak actif</p>
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              className={`px-3.5 py-1.5 border rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                notificationsEnabled 
                  ? 'bg-game-primary/10 border-game-primary/20 text-game-primary hover:bg-game-primary hover:text-game-bg' 
                  : 'bg-white/5 border-white/10 text-game-muted hover:text-game-text'
              }`}
            >
              {notificationsEnabled ? 'Activé' : 'Désactivé'}
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-game-card border border-game-border rounded-xl p-5 mt-6 space-y-4 shadow-sm">
          <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted flex items-center gap-2">
            <Info className="w-4.5 h-4.5 text-game-primary/80" />
            À Propos
          </h3>
          
          <div className="space-y-3.5 text-[10px] leading-relaxed text-game-muted font-medium">
            <div className="flex justify-between py-1.5 border-b border-game-border">
              <span>Nom du projet</span>
              <span className="text-game-text font-bold uppercase tracking-wide">IT Quizz</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-game-border">
              <span>Version</span>
              <span className="text-game-text font-mono font-bold">1.2.0 (Stable)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-game-border">
              <span>Équipe</span>
              <span className="text-game-text font-bold uppercase tracking-wide">Senior Web Devs</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Licence</span>
              <span className="text-game-text font-bold uppercase tracking-wide">MIT Open Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="text-center mt-8 z-10">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted hover:text-game-primary transition-colors duration-300"
        >
          <Code className="w-3.5 h-3.5" />
          Code Source sur GitHub
        </a>
      </div>
    </div>
  );
};

export default SettingsScreen;
