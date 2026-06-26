import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/context/AuthContext';
import { useGameStore } from '@/store/gameStore';
import BottomNav from '@/components/navigation/BottomNav';
import { 
  Play, Zap, Users, Award, ShieldAlert, 
  Settings, Flame, Trophy, Percent, User2 
} from 'lucide-react';
import type { GameMode } from '@/types/game';

interface GameModeItem {
  id: GameMode;
  name: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
  borderColor: string;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const setMode = useGameStore((state) => state.setMode);

  const user = authContext?.user;

  const modes: GameModeItem[] = [
    {
      id: 'classic',
      name: 'Solo Classique',
      badge: '🧠 Solo',
      description: 'Testez votre culture IT à votre rythme.',
      icon: Play,
      color: 'from-violet-600/20 to-purple-600/10 hover:from-violet-600/30 hover:to-purple-600/20',
      textColor: 'text-violet-400',
      borderColor: 'border-violet-500/20 hover:border-violet-500/50'
    },
    {
      id: 'flash',
      name: 'Question Flash',
      badge: '⚡ Rapide',
      description: 'Répondez contre la montre !',
      icon: Zap,
      color: 'from-cyan-600/20 to-teal-600/10 hover:from-cyan-600/30 hover:to-teal-600/20',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/20 hover:border-cyan-500/50'
    },
    {
      id: 'genius',
      name: 'Génie en Herbe',
      badge: '👥 Multi local',
      description: 'Défiez vos amis sur le même écran.',
      icon: Users,
      color: 'from-amber-600/20 to-orange-600/10 hover:from-amber-600/30 hover:to-orange-600/20',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/20 hover:border-amber-500/50'
    },
    {
      id: 'twelve_hits',
      name: 'Les 12 Coups',
      badge: '🏆 Défi',
      description: 'Enchaînez 12 bonnes réponses !',
      icon: Award,
      color: 'from-emerald-600/20 to-green-600/10 hover:from-emerald-600/30 hover:to-green-600/20',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/50'
    },
    {
      id: 'survival',
      name: 'Mode Survie',
      badge: '💀 Hardcore',
      description: '3 cœurs. Zéro droit à l\'erreur.',
      icon: ShieldAlert,
      color: 'from-rose-600/20 to-red-600/10 hover:from-rose-600/30 hover:to-red-600/20',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/20 hover:border-rose-500/50'
    }
  ];

  const handleSelectMode = (modeId: GameMode) => {
    setMode(modeId);
    navigate(`/modes/${modeId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-28 flex flex-col justify-between">
      <div>
        {/* Header section */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-game-primary/20 border border-game-primary/30 flex items-center justify-center text-game-primary">
              <User2 className="w-5 h-5 text-game-text" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-game-muted">Joueur</p>
              <h2 className="text-sm font-bold text-game-text leading-tight">
                {user ? `${user.firstname} ${user.lastname}` : 'Développeur'}
              </h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden game-glass-card rounded-3xl p-5 mb-6 text-center neon-glow-primary border-game-primary/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-game-primary/10 rounded-full blur-2xl" />
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
            Êtes-vous <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-primary to-game-secondary">prêt</span> ?
          </h1>
          <p className="text-xs text-game-muted leading-relaxed px-4 mb-4">
            Choisissez un mode de jeu, configurez votre scope et testez vos réflexes informatiques.
          </p>
          <button
            onClick={() => handleSelectMode('classic')}
            className="w-full py-3 bg-gradient-to-r from-game-primary to-game-secondary rounded-xl text-xs font-black uppercase tracking-wider text-game-text hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] cursor-pointer"
          >
            Lancer Partie Rapide
          </button>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-amber-500 mb-1 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]" />
            <span className="text-lg font-mono font-black">5</span>
            <span className="text-[10px] text-game-muted font-semibold uppercase">Streak</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <Trophy className="w-5 h-5 text-game-secondary mb-1 filter drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]" />
            <span className="text-lg font-mono font-black">32</span>
            <span className="text-[10px] text-game-muted font-semibold uppercase">Parties</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <Percent className="w-5 h-5 text-game-success mb-1 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.3)]" />
            <span className="text-lg font-mono font-black">82%</span>
            <span className="text-[10px] text-game-muted font-semibold uppercase">Précision</span>
          </div>
        </section>

        {/* Game Modes Grid */}
        <section className="mb-4">
          <h3 className="text-xs uppercase font-bold tracking-widest text-game-muted mb-3.5">
            Modes de Jeu
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  className={`col-span-1 rounded-2xl p-4 flex flex-col justify-between items-start text-left border bg-gradient-to-b ${mode.color} ${mode.borderColor} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                >
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/5 rounded-md border border-white/5 mb-3 ${mode.textColor}`}>
                    {mode.badge}
                  </span>
                  
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${mode.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold leading-tight mb-1 text-game-text">
                      {mode.name}
                    </h4>
                    <p className="text-[10px] text-game-muted leading-tight line-clamp-2">
                      {mode.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
