import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Volume2, VolumeX, Moon, Sun, 
  Bell, BellOff, Info, Code 
} from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();

  // Settings states initialized with localStorage or defaults
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    (localStorage.getItem('themeMode') as 'dark' | 'light') || 'dark'
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    localStorage.getItem('soundEnabled') !== 'false'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem('notificationsEnabled') === 'true'
  );

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    localStorage.setItem('themeMode', nextTheme);
    
    // Toggle HTML document class
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-8 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase font-bold tracking-widest text-game-muted">
            Réglages
          </span>
          <div className="w-10" />
        </header>

        {/* Configurations List */}
        <div className="space-y-4">
          {/* Theme Selector Toggle */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-game-primary shrink-0">
                {themeMode === 'dark' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-game-text">Thème Visuel</h4>
                <p className="text-[9px] text-game-muted">Changer le mode d'affichage</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3.5 py-1.5 bg-game-primary/20 border border-game-primary/30 rounded-xl text-[10px] font-black uppercase tracking-wider text-game-primary hover:bg-game-primary hover:text-game-text transition-all cursor-pointer"
            >
              {themeMode === 'dark' ? 'Sombre' : 'Clair'}
            </button>
          </div>

          {/* Sound settings toggle */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-game-primary shrink-0">
                {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-game-text">Effets Sonores</h4>
                <p className="text-[9px] text-game-muted">Sons de buzzer, clic et réussite</p>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`px-3.5 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-game-secondary/20 border-game-secondary/30 text-game-secondary hover:bg-game-secondary hover:text-game-bg' 
                  : 'bg-white/5 border-white/10 text-game-muted hover:text-game-text'
              }`}
            >
              {soundEnabled ? 'Activé' : 'Désactivé'}
            </button>
          </div>

          {/* Notification settings toggle */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-game-primary shrink-0">
                {notificationsEnabled ? <Bell className="w-4.5 h-4.5" /> : <BellOff className="w-4.5 h-4.5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-game-text">Rappels Quotidiens</h4>
                <p className="text-[9px] text-game-muted">Gardez votre streak actif</p>
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              className={`px-3.5 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                notificationsEnabled 
                  ? 'bg-game-secondary/20 border-game-secondary/30 text-game-secondary hover:bg-game-secondary hover:text-game-bg' 
                  : 'bg-white/5 border-white/10 text-game-muted hover:text-game-text'
              }`}
            >
              {notificationsEnabled ? 'Activé' : 'Désactivé'}
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 mt-6 space-y-4">
          <h3 className="text-xs uppercase font-black tracking-widest text-game-muted flex items-center gap-2">
            <Info className="w-4.5 h-4.5 text-game-secondary" />
            À Propos
          </h3>
          
          <div className="space-y-3 text-xs leading-relaxed text-game-muted font-semibold">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Nom du projet</span>
              <span className="text-game-text font-bold">IT Quizz</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Version</span>
              <span className="text-game-text font-mono font-bold">1.2.0 (Stable)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Équipe</span>
              <span className="text-game-text font-bold">Senior Web Devs</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Licence</span>
              <span className="text-game-text font-bold">MIT Open Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="text-center mt-8">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-game-muted hover:text-game-secondary transition-colors"
        >
          <Code className="w-3.5 h-3.5" />
          Code Source sur GitHub
        </a>
      </div>
    </div>
  );
};

export default SettingsScreen;
