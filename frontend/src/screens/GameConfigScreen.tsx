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
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between font-sans">
      {/* Grid backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
           }} 
      />

      <div className="z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-game-input border border-game-border flex items-center justify-center text-game-muted hover:text-game-text hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Configuration
          </span>
          <div className="w-9" />
        </header>

        {/* Selected Scope Badge Recap */}
        <div className="bg-game-primary/10 border border-game-primary/20 rounded-xl p-4 mb-6 shadow-sm">
          <span className="text-[7px] uppercase font-bold tracking-wider px-2 py-0.5 bg-game-primary/20 border border-game-primary/30 rounded text-game-primary mb-2 inline-block">
            Cible Sélectionnée
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Layers className="w-4 h-4 text-game-primary shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wide truncate">
              {selectedScope.breadcrumb.map(b => b.label).join(' › ')}
            </span>
          </div>
        </div>

        {/* Configurations Form */}
        <div className="space-y-6">
          {/* Question Count Slider */}
          <div className="bg-game-card border border-game-border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted flex items-center gap-2">
                <Target className="w-4 h-4 text-game-primary/80" />
                Nombre de Questions
              </label>
              <span className="text-[10px] font-mono font-bold text-game-primary px-2 py-0.5 bg-game-primary/10 border border-game-primary/20 rounded">
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
              className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-game-primary"
            />
            <div className="flex justify-between text-[8px] text-white/20 font-mono font-bold mt-2.5">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>

          {/* Difficulty Toggles */}
          <div className="bg-game-card border border-game-border rounded-xl p-4 shadow-sm">
            <label className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted mb-3.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-game-primary/80" />
              Niveau de Difficulté
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-black/20 p-1.5 rounded-xl border border-game-border">
              {(['mixed', 'easy', 'medium', 'hard'] as const).map((diff) => {
                const label = { mixed: 'Mixte', easy: 'Facile', medium: 'Moyen', hard: 'Expert' }[diff];
                const active = difficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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

          {/* Mode-specific settings */}
          {selectedMode === 'flash' && (
            <div className="bg-game-card border border-game-border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted">
                  Temps par Question (Chrono)
                </label>
                <span className="text-[10px] font-mono font-bold text-game-primary px-2 py-0.5 bg-game-primary/10 border border-game-primary/20 rounded">
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
                className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-game-primary"
              />
              <div className="flex justify-between text-[8px] text-white/20 font-mono font-bold mt-2.5">
                <span>5s</span>
                <span>15s</span>
                <span>30s</span>
              </div>
            </div>
          )}

          {selectedMode === 'genius' && (
            <div className="space-y-4">
              {/* Player Count Selection */}
              <div className="bg-game-card border border-game-border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-game-primary/80" />
                    Nombre de Joueurs
                  </label>
                  <span className="text-[10px] font-mono font-bold text-game-primary px-2 py-0.5 bg-game-primary/10 border border-game-primary/20 rounded">
                    {playerCount} Joueurs
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-xl border border-game-border">
                  {[2, 3, 4].map((count) => {
                    const active = playerCount === count;
                    return (
                      <button
                        key={count}
                        onClick={() => setPlayerCount(count)}
                        className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          active 
                            ? 'bg-game-primary text-game-bg shadow-sm' 
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
              <div className="bg-game-card border border-game-border rounded-xl p-4 space-y-3.5 shadow-sm">
                <label className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted">
                  Noms des Joueurs
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  {Array.from({ length: playerCount }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <span className="text-[8px] uppercase font-bold text-game-muted">Joueur {idx + 1}</span>
                      <input
                        type="text"
                        value={playerNames[idx]}
                        onChange={(e) => updatePlayerName(idx, e.target.value)}
                        className="bg-game-input border border-game-border rounded-lg px-3 py-2 text-xs font-bold text-game-text focus:border-game-primary/45 focus:shadow-[0_0_10px_rgba(197,168,128,0.06)] transition-all duration-300 outline-none"
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
      <div className="mt-8 z-10">
        <button
          onClick={handleStartGame}
          className="w-full py-3.5 bg-game-primary text-game-bg rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Lancer la Partie
        </button>
      </div>
    </div>
  );
};

export default GameConfigScreen;
