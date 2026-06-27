import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { getMockData } from '@/mocks/mockData';
import { ArrowLeft, Play, Layers, Award, Target, UserPlus } from 'lucide-react';
import type { QuestionResponse } from '@/types/question';

const GameConfigScreen = () => {
  const navigate = useNavigate();
  const selectedScope = useGameStore((state) => state.selectedScope);
  const selectedMode = useGameStore((state) => state.selectedMode);
  const initSession = useGameStore((state) => state.initSession);

  // Fallback to home if no scope is selected
  if (!selectedScope) {
    navigate('/');
    return null;
  }

  // Configuration options local state
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [timePerQuestion, setTimePerQuestion] = useState<number>(15);
  const [playerCount, setPlayerCount] = useState<number>(2);

  // Genius mode custom player names state
  const [playerNames, setPlayerNames] = useState<string[]>(['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4']);

  const handleStartGame = () => {
    // 1. Gather all questions matching the selected scope
    const themes = getMockData();
    let matchingQuestions: QuestionResponse[] = [];

    const scopeId = selectedScope.id;
    const scopeLevel = selectedScope.level;

    themes.forEach(t => {
      // Theme level match
      if (scopeLevel === 'theme' && t.id === scopeId) {
        t.categories.forEach(c => c.subcategories.forEach(s => s.topics.forEach(tp => matchingQuestions.push(...tp.questions))));
      } else {
        t.categories.forEach(c => {
          // Category level match
          if (scopeLevel === 'category' && c.id === scopeId) {
            c.subcategories.forEach(s => s.topics.forEach(tp => matchingQuestions.push(...tp.questions)));
          } else {
            c.subcategories.forEach(s => {
              // Subcategory level match
              if (scopeLevel === 'subcategory' && s.id === scopeId) {
                s.topics.forEach(tp => matchingQuestions.push(...tp.questions));
              } else {
                s.topics.forEach(tp => {
                  // Topic level match
                  if (scopeLevel === 'topic' && tp.id === scopeId) {
                    matchingQuestions.push(...tp.questions);
                  }
                });
              }
            });
          }
        });
      }
    });

    // 2. Filter out duplicates
    const uniqueQuestions = matchingQuestions.reduce<QuestionResponse[]>((acc, current) => {
      if (!acc.find(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    // 3. Filter by difficulty
    let filteredQuestions = [...uniqueQuestions];
    if (difficulty !== 'mixed') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }

    if (filteredQuestions.length === 0) {
      alert("Désolé, aucune question ne correspond à cette difficulté dans le scope choisi.");
      return;
    }

    // 4. Shuffle the selected subset
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());

    // 5. Store session config in Zustand
    const store = useGameStore.getState();
    store.setConfig({
      questionCount,
      difficulty,
      timePerQuestion: selectedMode === 'flash' ? timePerQuestion : undefined,
      playerCount: selectedMode === 'genius' ? playerCount : undefined
    });

    // Initialize session and navigate to active gameplay shell
    const customNames = selectedMode === 'genius' ? playerNames.slice(0, playerCount) : undefined;
    initSession(shuffled, customNames);
    navigate('/play/game');
  };

  const updatePlayerName = (index: number, val: string) => {
    const updated = [...playerNames];
    updated[index] = val;
    setPlayerNames(updated);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-8 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase font-bold tracking-widest text-game-muted">
            Configuration
          </span>
          <div className="w-10" />
        </header>

        {/* Selected Scope Badge Recap */}
        <div className="bg-game-primary/10 border border-game-primary/20 rounded-2xl p-4 mb-6">
          <span className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 bg-game-primary/30 rounded-md text-game-primary mb-2 inline-block">
            Cible Sélectionnée
          </span>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-game-secondary shrink-0" />
            <span className="text-xs font-bold truncate">
              {selectedScope.breadcrumb.map(b => b.label).join(' › ')}
            </span>
          </div>
        </div>

        {/* Configurations Form */}
        <div className="space-y-6">
          {/* Question Count Slider */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs uppercase font-bold tracking-wider text-game-muted flex items-center gap-2">
                <Target className="w-4 h-4 text-game-secondary" />
                Nombre de Questions
              </label>
              <span className="text-xs font-mono font-black text-game-secondary px-2 py-0.5 bg-game-secondary/15 rounded-md">
                {questionCount}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="5"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-game-primary"
            />
            <div className="flex justify-between text-[10px] text-white/35 font-mono font-black mt-2">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>

          {/* Difficulty Toggles */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <label className="text-xs uppercase font-bold tracking-wider text-game-muted mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-game-secondary" />
              Niveau de Difficulté
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-black/20 p-1.5 rounded-xl border border-white/5">
              {(['mixed', 'easy', 'medium', 'hard'] as const).map((diff) => {
                const label = { mixed: 'Mixte', easy: 'Facile', medium: 'Moyen', hard: 'Expert' }[diff];
                const active = difficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
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
          </div>

          {/* Mode-specific settings */}
          {selectedMode === 'flash' && (
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs uppercase font-bold tracking-wider text-game-muted">
                  Temps par Question (Chrono)
                </label>
                <span className="text-xs font-mono font-black text-game-secondary px-2 py-0.5 bg-game-secondary/15 rounded-md">
                  {timePerQuestion}s
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-game-primary"
              />
              <div className="flex justify-between text-[10px] text-white/35 font-mono font-black mt-2">
                <span>5s</span>
                <span>15s</span>
                <span>30s</span>
              </div>
            </div>
          )}

          {selectedMode === 'genius' && (
            <div className="space-y-4">
              {/* Player Count Selection */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase font-bold tracking-wider text-game-muted flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-game-secondary" />
                    Nombre de Joueurs
                  </label>
                  <span className="text-xs font-mono font-black text-game-secondary px-2 py-0.5 bg-game-secondary/15 rounded-md">
                    {playerCount} Joueurs
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-xl border border-white/5">
                  {[2, 3, 4].map((count) => {
                    const active = playerCount === count;
                    return (
                      <button
                        key={count}
                        onClick={() => setPlayerCount(count)}
                        className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          active 
                            ? 'bg-game-primary text-game-text shadow-md' 
                            : 'text-game-muted hover:text-game-text'
                        }`}
                      >
                        {count} Joueurs
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Player Name Customizer */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
                <label className="text-xs uppercase font-bold tracking-wider text-game-muted">
                  Noms des Joueurs
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: playerCount }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase font-bold text-game-muted">Joueur {idx + 1}</span>
                      <input
                        type="text"
                        value={playerNames[idx]}
                        onChange={(e) => updatePlayerName(idx, e.target.value)}
                        className="bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-xs font-bold text-game-text focus:outline-none focus:border-game-primary/60 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Launch Action Button */}
      <div className="mt-8">
        <button
          onClick={handleStartGame}
          className="w-full py-4 bg-gradient-to-r from-game-primary to-game-secondary rounded-2xl text-xs font-black uppercase tracking-wider text-game-text hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          Lancer la Partie
        </button>
      </div>
    </div>
  );
};

export default GameConfigScreen;
