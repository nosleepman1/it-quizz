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

  const displayName = user ? `${user.firstname} ${user.lastname}` : 'Développeur';
  const displayEmail = user ? user.email : 'dev@domain.com';

  const badges = [
    { name: 'Cadet React', icon: Terminal, desc: 'A complété un quiz React', unlocked: true, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
    { name: 'ACID Survivor', icon: ShieldCheck, desc: 'Survécu à PostgreSQL', unlocked: true, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Streak Master', icon: FlameKindling, desc: '5 jours d\'affilée', unlocked: true, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'Flash Champion', icon: Zap, desc: 'Quiz Flash sans faute', unlocked: false, color: 'text-white/20 bg-white/5 border-white/5' }
  ];

  const recentGames = [
    { id: 1, topic: 'Hooks React', score: '80%', mode: 'Solo Classique', date: 'Hier' },
    { id: 2, topic: 'Dockerfile', score: '100%', mode: 'Flash', date: 'Il y a 3 jours' },
    { id: 3, topic: 'ACID PostgreSQL', score: '50%', mode: 'Survie', date: 'Il y a 5 jours' }
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-28 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-game-muted">
              Profil du Joueur
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight mt-1 text-game-text">
              Mon Espace
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-xl bg-game-error/15 border border-game-error/20 flex items-center justify-center text-game-error hover:bg-game-error hover:text-game-text transition-all cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* User Card */}
        <section className="game-glass-card rounded-3xl p-5 mb-6 flex items-center gap-4 border border-white/5 neon-glow-primary border-game-primary/20">
          <div className="w-14 h-14 rounded-2xl bg-game-primary/20 border border-game-primary/40 flex items-center justify-center text-game-primary shrink-0">
            <User className="w-7 h-7 text-game-text" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-base font-black text-game-text truncate">{displayName}</h3>
            <p className="text-xs text-game-muted truncate">{displayEmail}</p>
            <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-game-secondary/10 border border-game-secondary/20 rounded-md text-game-secondary mt-1.5 inline-block">
              Niveau 4 • Senior Dev
            </span>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
            <Flame className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-[8px] uppercase font-bold text-game-muted">Streak Actif</p>
              <h4 className="text-base font-mono font-black text-game-text leading-tight">5 Jours</h4>
            </div>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
            <Star className="w-6 h-6 text-game-secondary" />
            <div>
              <p className="text-[8px] uppercase font-bold text-game-muted">Précision Moy.</p>
              <h4 className="text-base font-mono font-black text-game-text leading-tight">78%</h4>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-6">
          <h3 className="text-xs uppercase font-bold tracking-widest text-game-muted mb-3.5 flex items-center gap-2">
            <Award className="w-4.5 h-4.5 text-game-primary" />
            Badges Débloqués
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.name}
                  className={`rounded-2xl p-3.5 border flex flex-col items-start ${badge.color} transition-all`}
                >
                  <BadgeIcon className="w-6 h-6 mb-2.5" />
                  <h4 className="text-xs font-black text-game-text leading-none">{badge.name}</h4>
                  <p className="text-[9px] text-game-muted mt-1 leading-tight">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-xs uppercase font-bold tracking-widest text-game-muted mb-3.5 flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-game-secondary" />
            Activités Récentes
          </h3>

          <div className="space-y-2.5">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="bg-white/5 border border-white/5 rounded-2xl p-3 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xs font-black text-game-text leading-tight">{game.topic}</h4>
                  <p className="text-[9px] text-game-muted mt-0.5">{game.mode} • {game.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-black text-game-secondary">{game.score}</span>
                  <p className="text-[8px] uppercase font-bold text-game-muted">Score</p>
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
