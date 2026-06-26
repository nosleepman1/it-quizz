import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';
import { Trophy, Medal, Star, Flame, Sparkles } from 'lucide-react';

const LeaderboardScreen = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'month'>('global');

  const selfName = user ? `${user.firstname} ${user.lastname}` : 'Vous';

  // Mock datasets for leaderboard
  const datasets = {
    global: [
      { rank: 1, name: 'Alexandre Dev', score: 2450, streak: 12, isSelf: false, avatarColor: 'bg-amber-500' },
      { rank: 2, name: 'Bastien_SQL', score: 2180, streak: 8, isSelf: false, avatarColor: 'bg-indigo-500' },
      { rank: 3, name: 'Clara_Hook', score: 2010, streak: 5, isSelf: false, avatarColor: 'bg-rose-500' },
      { rank: 4, name: 'Dorian_Docker', score: 1890, streak: 4, isSelf: false, avatarColor: 'bg-emerald-500' },
      { rank: 12, name: selfName, score: 980, streak: 5, isSelf: true, avatarColor: 'bg-game-primary' }
    ],
    friends: [
      { rank: 1, name: 'Bastien_SQL', score: 2180, streak: 8, isSelf: false, avatarColor: 'bg-indigo-500' },
      { rank: 2, name: 'Clara_Hook', score: 2010, streak: 5, isSelf: false, avatarColor: 'bg-rose-500' },
      { rank: 3, name: selfName, score: 980, streak: 5, isSelf: true, avatarColor: 'bg-game-primary' },
      { rank: 4, name: 'Emma_Python', score: 850, streak: 2, isSelf: false, avatarColor: 'bg-orange-500' }
    ],
    month: [
      { rank: 1, name: 'Clara_Hook', score: 820, streak: 5, isSelf: false, avatarColor: 'bg-rose-500' },
      { rank: 2, name: 'Alexandre Dev', score: 790, streak: 12, isSelf: false, avatarColor: 'bg-amber-500' },
      { rank: 3, name: selfName, score: 550, streak: 5, isSelf: true, avatarColor: 'bg-game-primary' },
      { rank: 4, name: 'Bastien_SQL', score: 410, streak: 8, isSelf: false, avatarColor: 'bg-indigo-500' }
    ]
  };

  const activeList = datasets[activeTab];
  const selfUser = activeList.find(p => p.isSelf);

  // Render Medal Icons
  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700 drop-shadow-[0_0_4px_rgba(180,83,9,0.4)]" />;
    return <span className="text-[11px] font-mono font-black text-game-muted w-5 text-center">{rank}</span>;
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-28 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="mb-5">
          <span className="text-[10px] uppercase font-black tracking-widest text-game-muted">
            Podium
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-1 text-game-text">
            Classements
          </h1>
        </header>

        {/* Custom tabs selector */}
        <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-xl border border-white/5 mb-6">
          {(['global', 'friends', 'month'] as const).map((tab) => {
            const label = { global: 'Global', friends: 'Amis', month: 'Ce Mois' }[tab];
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  active 
                    ? 'bg-game-primary text-game-text shadow-md' 
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
              className={`rounded-2xl p-3.5 flex items-center justify-between border transition-all ${
                player.isSelf 
                  ? 'bg-game-primary/10 border-game-primary/40 neon-glow-primary' 
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <div className="flex items-center gap-3.5 mr-2 overflow-hidden">
                {/* Medal or number rank */}
                <div className="shrink-0 w-6 flex justify-center">
                  {getRankBadge(player.rank)}
                </div>

                {/* Dummy Avatar */}
                <div className={`w-8 h-8 rounded-lg ${player.avatarColor} flex items-center justify-center text-xs font-bold text-game-text shrink-0`}>
                  {player.name.substring(0, 2).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-game-text truncate">
                    {player.name} {player.isSelf && <span className="text-[9px] text-game-secondary font-black">(VOUS)</span>}
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
        <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-game-card/95 border border-game-primary/30 p-3.5 rounded-2xl flex items-center justify-between shadow-xl z-40 neon-glow-primary">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-game-secondary" />
            <div>
              <p className="text-[8px] uppercase font-black text-game-muted">Votre Rang Global</p>
              <h4 className="text-xs font-black text-game-text">#{selfUser.rank} {selfUser.name}</h4>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase font-black text-game-muted">Total Score</p>
            <h4 className="text-xs font-mono font-black text-game-secondary">{selfUser.score} pts</h4>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default LeaderboardScreen;
