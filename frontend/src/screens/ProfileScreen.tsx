import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import type { AuthContextType } from '@/types/auth';
import BottomNav from '@/components/navigation/BottomNav';
import { 
  User, Award, Star, Flame, Calendar, LogOut, 
  Terminal, ShieldCheck, FlameKindling, Zap
} from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate('/login');
    }
  };

  const displayName = user ? (user.username || user.name || 'Développeur') : 'Développeur';
  const displayEmail = user ? user.email : 'dev@domain.com';

  const badges = [
    { name: 'Cadet React', icon: Terminal, desc: 'A complété un quiz React', unlocked: true, color: 'text-game-primary bg-game-primary/10 border-game-primary/20' },
    { name: 'ACID Survivor', icon: ShieldCheck, desc: 'Survécu à PostgreSQL', unlocked: true, color: 'text-game-success bg-game-success/10 border-game-success/20' },
    { name: 'Streak Master', icon: FlameKindling, desc: '5 jours d\'affilée', unlocked: true, color: 'text-game-warning bg-game-warning/10 border-game-warning/20' },
    { name: 'Flash Champion', icon: Zap, desc: 'Quiz Flash sans faute', unlocked: false, color: 'text-white/20 bg-white/5 border-white/5' }
  ];

  const recentGames = [
    { id: 1, topic: 'Hooks React', score: '80%', mode: 'Solo Classique', date: 'Hier' },
    { id: 2, topic: 'Dockerfile', score: '100%', mode: 'Flash', date: 'Il y a 3 jours' },
    { id: 3, topic: 'ACID PostgreSQL', score: '50%', mode: 'Survie', date: 'Il y a 5 jours' }
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-28 flex flex-col justify-between font-sans">
      {/* Grid backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <div>
            <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
              Profil du Joueur
            </span>
            <h1 className="text-xl font-bold uppercase tracking-wider mt-1 text-game-text">
              Mon Espace
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-lg bg-game-error/15 border border-game-error/20 flex items-center justify-center text-game-error hover:bg-game-error hover:text-game-text transition-all duration-300 cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        {/* User Card */}
        <section className="bg-game-card rounded-xl p-5 mb-5 flex items-center gap-4 border border-game-border shadow-md">
          <div className="w-12 h-12 rounded-lg bg-game-primary/10 border border-game-primary/20 flex items-center justify-center text-game-primary shrink-0">
            <User className="w-5 h-5 text-game-text" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold text-game-text truncate uppercase tracking-wide">{displayName}</h3>
            <p className="text-[10px] text-game-muted truncate font-medium mt-0.5">{displayEmail}</p>
            <span className="text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 bg-game-primary/10 border border-game-primary/20 rounded text-game-primary mt-2 inline-block">
              Niveau 4 • Senior Dev
            </span>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="grid grid-cols-2 gap-3.5 mb-5">
          <div className="bg-game-card border border-game-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <Flame className="w-5 h-5 text-game-primary/80" />
            <div>
              <p className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Streak Actif</p>
              <h4 className="text-sm font-mono font-bold text-game-text leading-tight mt-0.5">5 Jours</h4>
            </div>
          </div>
          <div className="bg-game-card border border-game-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <Star className="w-5 h-5 text-game-success/80" />
            <div>
              <p className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Précision Moy.</p>
              <h4 className="text-sm font-mono font-bold text-game-text leading-tight mt-0.5">78%</h4>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-5">
          <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted mb-3.5 flex items-center gap-2 pl-0.5">
            <Award className="w-4 h-4 text-game-primary/80" />
            Badges Débloqués
          </h3>

          <div className="grid grid-cols-2 gap-3.5">
            {badges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.name}
                  className={`rounded-xl p-3.5 border flex flex-col items-start shadow-sm ${badge.color} transition-all`}
                >
                  <BadgeIcon className="w-5 h-5 mb-2.5" />
                  <h4 className="text-[10px] font-bold text-game-text leading-none uppercase tracking-wide">{badge.name}</h4>
                  <p className="text-[9px] text-game-muted mt-1 leading-relaxed font-medium">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted mb-3.5 flex items-center gap-2 pl-0.5">
            <Calendar className="w-4 h-4 text-game-primary/80" />
            Activités Récentes
          </h3>

          <div className="space-y-2.5">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="bg-game-card border border-game-border rounded-xl p-3.5 flex justify-between items-center shadow-sm"
              >
                <div>
                  <h4 className="text-[10px] font-bold text-game-text leading-tight uppercase tracking-wide">{game.topic}</h4>
                  <p className="text-[9px] text-game-muted mt-1 font-medium">{game.mode} • {game.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-game-primary">{game.score}</span>
                  <p className="text-[8px] uppercase font-bold tracking-wider text-game-muted mt-0.5">Score</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default ProfileScreen;
