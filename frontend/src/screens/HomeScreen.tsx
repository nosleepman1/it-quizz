import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  accentColor: string;
  badgeBg: string;
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
      badge: 'Solo',
      description: 'Testez votre culture IT à votre propre rythme.',
      icon: Play,
      accentColor: 'text-game-primary',
      badgeBg: 'bg-game-primary/10 text-game-primary border-game-primary/20'
    },
    {
      id: 'flash',
      name: 'Question Flash',
      badge: 'Rapide',
      description: 'Répondez contre la montre dans un sprint intense.',
      icon: Zap,
      accentColor: 'text-game-warning',
      badgeBg: 'bg-game-warning/10 text-game-warning border-game-warning/20'
    },
    {
      id: 'genius',
      name: 'Génie en Herbe',
      badge: 'Multi',
      description: 'Défiez vos collègues en local sur le même écran.',
      icon: Users,
      accentColor: 'text-game-primary',
      badgeBg: 'bg-game-primary/10 text-game-primary border-game-primary/20'
    },
    {
      id: 'twelve_hits',
      name: 'Les 12 Coups',
      badge: 'Défi',
      description: 'Enchaînez un perfect de 12 bonnes réponses.',
      icon: Award,
      accentColor: 'text-game-success',
      badgeBg: 'bg-game-success/10 text-game-success border-game-success/20'
    },
    {
      id: 'survival',
      name: 'Mode Survie',
      badge: 'Survie',
      description: '3 cœurs maximum. Zéro droit à l\'erreur.',
      icon: ShieldAlert,
      accentColor: 'text-game-error',
      badgeBg: 'bg-game-error/10 text-game-error border-game-error/20'
    }
  ];

  const handleSelectMode = (modeId: GameMode) => {
    setMode(modeId);
    navigate(`/modes/${modeId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-28 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Grid Pattern (Very Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '32px 32px' 
           }} 
      />

      <div className="z-10">
        {/* Header section */}
        <motion.header 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-game-primary/10 border border-game-primary/20 flex items-center justify-center text-game-primary">
              <User2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">Opérateur Accrédité</p>
              <h2 className="text-xs font-bold text-game-text leading-tight uppercase tracking-wider">
                {user ? (user.username || user.name || 'NeoDev') : 'Développeur'}
              </h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="w-9 h-9 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-muted hover:text-game-text hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-game-card border border-game-border rounded-xl p-5 mb-5 text-center shadow-md"
        >
          <h1 className="text-base font-bold uppercase tracking-[0.15em] mb-1.5">
            L'arène des <span className="text-game-primary">Développeurs</span>
          </h1>
          <p className="text-[10px] text-game-muted leading-relaxed px-4 mb-4 font-medium">
            Mesurez vos compétences IT réelles, enchaînez les séries parfaites et dominez les classements de la division.
          </p>
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelectMode('classic')}
            className="w-full py-3 bg-game-primary text-game-bg rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 hover:opacity-90 shadow-md"
          >
            Lancer Partie Classique
          </motion.button>
        </motion.section>

        {/* Quick Stats Grid */}
        <motion.section 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          <div className="bg-game-card border border-game-border rounded-xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <Flame className="w-4 h-4 text-game-primary/80 mb-1" />
            <span className="text-base font-mono font-bold text-game-text">5</span>
            <span className="text-[8px] text-game-muted font-bold uppercase tracking-wider">Streak</span>
          </div>
          <div className="bg-game-card border border-game-border rounded-xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <Trophy className="w-4 h-4 text-game-primary/80 mb-1" />
            <span className="text-base font-mono font-bold text-game-text">32</span>
            <span className="text-[8px] text-game-muted font-bold uppercase tracking-wider">Parties</span>
          </div>
          <div className="bg-game-card border border-game-border rounded-xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <Percent className="w-4 h-4 text-game-success/80 mb-1" />
            <span className="text-base font-mono font-bold text-game-text">82%</span>
            <span className="text-[8px] text-game-muted font-bold uppercase tracking-wider">Précision</span>
          </div>
        </motion.section>

        {/* Game Modes Grid */}
        <motion.section 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted mb-3.5 block pl-0.5">
            Sélecteur de Mode
          </h3>
          
          <div className="grid grid-cols-2 gap-3.5">
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  className="col-span-1 rounded-xl p-4 flex flex-col justify-between items-start text-left border border-game-border bg-game-card hover:bg-game-input transition-all duration-300 cursor-pointer shadow-md group relative overflow-hidden h-[160px]"
                >
                  <span className={`text-[7px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${mode.badgeBg} mb-3 block`}>
                    {mode.badge}
                  </span>
                  
                  <div className="w-8 h-8 rounded-lg bg-black/35 border border-game-border flex items-center justify-center mb-3">
                    <Icon className={`w-4 h-4 ${mode.accentColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider leading-tight mb-1 text-game-text">
                      {mode.name}
                    </h4>
                    <p className="text-[8px] text-game-muted leading-relaxed line-clamp-2 font-medium">
                      {mode.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;

