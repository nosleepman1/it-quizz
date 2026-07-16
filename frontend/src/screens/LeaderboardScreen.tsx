import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';
import { Trophy, Medal, Star, Flame, Sparkles } from 'lucide-react';

const LeaderboardScreen = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'month'>('global');

  const selfName = user ? (user.username || user.name || 'Vous') : 'Vous';

  // Mock datasets for leaderboard
  const datasets = {
    global: [
      { rank: 1, name: 'Alexandre Dev', score: 2450, streak: 12, isSelf: false, avatarColor: 'bg-game-primary/25 border border-game-primary/35 text-game-primary' },
      { rank: 2, name: 'Bastien_SQL', score: 2180, streak: 8, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 3, name: 'Clara_Hook', score: 2010, streak: 5, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 4, name: 'Dorian_Docker', score: 1890, streak: 4, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 12, name: selfName, score: 980, streak: 5, isSelf: true, avatarColor: 'bg-game-primary/25 border border-game-primary/35 text-game-primary' }
    ],
    friends: [
      { rank: 1, name: 'Bastien_SQL', score: 2180, streak: 8, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 2, name: 'Clara_Hook', score: 2010, streak: 5, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 3, name: selfName, score: 980, streak: 5, isSelf: true, avatarColor: 'bg-game-primary/25 border border-game-primary/35 text-game-primary' },
      { rank: 4, name: 'Emma_Python', score: 850, streak: 2, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' }
    ],
    month: [
      { rank: 1, name: 'Clara_Hook', score: 820, streak: 5, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' },
      { rank: 2, name: 'Alexandre Dev', score: 790, streak: 12, isSelf: false, avatarColor: 'bg-game-primary/25 border border-game-primary/35 text-game-primary' },
      { rank: 3, name: selfName, score: 550, streak: 5, isSelf: true, avatarColor: 'bg-game-primary/25 border border-game-primary/35 text-game-primary' },
      { rank: 4, name: 'Bastien_SQL', score: 410, streak: 8, isSelf: false, avatarColor: 'bg-white/5 border border-white/5 text-game-muted' }
    ]
  };

  const activeList = datasets[activeTab];
  const selfUser = activeList.find(p => p.isSelf);

  // Render Medal Icons
  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-game-primary" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-game-secondary" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-game-secondary/60" />;
    return <span className="text-[10px] font-mono font-bold text-game-muted w-4 text-center">{rank}</span>;
  };

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
        <header className="mb-5">
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Podium
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wider mt-1 text-game-text">
            Classements
          </h1>
        </header>

        {/* Custom tabs selector */}
        <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-xl border border-game-border mb-6">
          {(['global', 'friends', 'month'] as const).map((tab) => {
            const label = { global: 'Global', friends: 'Amis', month: 'Ce Mois' }[tab];
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
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

        {/* Rankings Listing */}
        <div className="space-y-2.5">
          {activeList.map((player) => (
            <div
              key={player.name}
              className={`rounded-xl p-3.5 flex items-center justify-between border transition-all duration-300 ${
                player.isSelf 
                  ? 'bg-game-primary/10 border-game-primary/20 shadow-md' 
                  : 'bg-game-card border-game-border shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5 mr-2 overflow-hidden">
                {/* Medal or number rank */}
                <div className="shrink-0 w-6 flex justify-center">
                  {getRankBadge(player.rank)}
                </div>

                {/* Dummy Avatar */}
                <div className={`w-8 h-8 rounded-lg ${player.avatarColor} flex items-center justify-center text-[10px] font-bold shrink-0`}>
                  {player.name.substring(0, 2).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-game-text truncate">
                    {player.name} {player.isSelf && <span className="text-[9px] text-game-secondary font-black ml-1">(VOUS)</span>}
                  </h4>
                  <span className="text-[9px] font-mono text-game-muted font-bold inline-flex items-center gap-1.5 mt-0.5">
                    <Flame className="w-3 h-3 text-amber-500" />
                    Streak {player.streak} jours
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-black text-game-secondary flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-game-secondary" />
                  {player.score}
                </span>
                <span className="text-[8px] uppercase font-bold text-game-muted">Points</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Sticky Self Rank at the bottom above BottomNav */}
      {selfUser && activeTab === 'global' && (
        <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-game-card/95 border border-game-primary/20 p-3.5 rounded-xl flex items-center justify-between shadow-xl z-40">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-game-primary" />
            <div>
              <p className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Votre Rang Global</p>
              <h4 className="text-xs font-bold text-game-text">#{selfUser.rank} {selfUser.name}</h4>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Score Total</p>
            <h4 className="text-xs font-mono font-bold text-game-primary">{selfUser.score} pts</h4>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default LeaderboardScreen;
