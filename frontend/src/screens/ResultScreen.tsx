import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getMockData } from '@/mocks/mockData';
import { 
  Trophy, RotateCcw, Home, 
  ChevronDown, ChevronUp, Check, X, ShieldAlert, Award
} from 'lucide-react';
import type { QuestionResponse } from '@/types/question';

const ResultScreen = () => {
  const navigate = useNavigate();
  
  const selectedMode = useGameStore((state) => state.selectedMode);
  const selectedScope = useGameStore((state) => state.selectedScope);
  const gameConfig = useGameStore((state) => state.gameConfig);
  const session = useGameStore((state) => state.session);
  const initSession = useGameStore((state) => state.initSession);
  const resetGame = useGameStore((state) => state.resetGame);

  const [showCorrections, setShowCorrections] = useState<boolean>(false);

  // Return to home if no active game session
  if (!session || !selectedMode) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg flex items-center justify-center p-4">
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-game-primary rounded-xl text-xs font-bold uppercase">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const { questions, answers, players, survivalLivesRemaining } = session;

  // Calculate scores
  const totalQuestions = questions.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Feedback message
  let feedbackText = 'Entraînez-vous encore !';
  let feedbackColor = 'text-game-error';
  if (selectedMode === 'survival' && survivalLivesRemaining === 0) {
    feedbackText = 'GAME OVER !';
    feedbackColor = 'text-game-error font-black';
  } else if (scorePercent >= 80) {
    feedbackText = 'Excellent travail !';
    feedbackColor = 'text-game-success font-black';
  } else if (scorePercent >= 50) {
    feedbackText = 'Pas mal ! Continuer comme ça';
    feedbackColor = 'text-game-warning font-black';
  }

  // Handle replaying with same settings
  const handleReplay = () => {
    // Gather matching questions for same scope
    const themes = getMockData();
    let matchingQuestions: QuestionResponse[] = [];
    const scopeId = selectedScope ? selectedScope.id : 'random';
    const scopeLevel = selectedScope ? selectedScope.level : 'theme';

    if (!selectedScope) {
      // Pick random
      themes.forEach(t => t.categories.forEach(c => c.subcategories.forEach(s => s.topics.forEach(tp => matchingQuestions.push(...tp.questions)))));
    } else {
      themes.forEach(t => {
        if (scopeLevel === 'theme' && t.id === scopeId) {
          t.categories.forEach(c => c.subcategories.forEach(s => s.topics.forEach(tp => matchingQuestions.push(...tp.questions))));
        } else {
          t.categories.forEach(c => {
            if (scopeLevel === 'category' && c.id === scopeId) {
              c.subcategories.forEach(s => s.topics.forEach(tp => matchingQuestions.push(...tp.questions)));
            } else {
              c.subcategories.forEach(s => {
                if (scopeLevel === 'subcategory' && s.id === scopeId) {
                  s.topics.forEach(tp => matchingQuestions.push(...tp.questions));
                } else {
                  s.topics.forEach(tp => {
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
    }

    // Filter duplicates
    const unique = matchingQuestions.reduce<QuestionResponse[]>((acc, cur) => {
      if (!acc.find(i => i.id === cur.id)) acc.push(cur);
      return acc;
    }, []);

    // Filter difficulty
    let filtered = [...unique];
    if (gameConfig.difficulty !== 'mixed') {
      filtered = filtered.filter(q => q.difficulty === gameConfig.difficulty);
    }

    if (filtered.length === 0) {
      filtered = unique; // bypass filter if empty
    }

    const shuffled = filtered.sort(() => 0.5 - Math.random());
    
    // Re-initialize session using custom players if multiplayer genius
    const customNames = selectedMode === 'genius' ? players.map(p => p.name) : undefined;
    initSession(shuffled, customNames);
    navigate('/play/game');
  };

  const handleReturnHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between select-none font-sans">
      <div>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="w-9" />
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-game-muted">
            Rapport de Mission
          </span>
          <div className="w-9" />
        </header>

        {/* Circular Animated Performance Arc & Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative flex items-center justify-center w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle
                className="stroke-white/5"
                fill="transparent"
                strokeWidth={1.5}
                r={54}
                cx={72}
                cy={72}
              />
              <motion.circle
                className={scorePercent >= 80 ? 'stroke-game-success' : scorePercent >= 50 ? 'stroke-game-warning' : 'stroke-game-error'}
                fill="transparent"
                strokeWidth={1.5}
                strokeLinecap="round"
                r={54}
                cx={72}
                cy={72}
                initial={{ strokeDasharray: '0 340' }}
                animate={{ strokeDasharray: `${(scorePercent / 100) * 340} 340` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              {selectedMode === 'survival' && survivalLivesRemaining === 0 ? (
                <ShieldAlert className="w-6 h-6 text-game-error" />
              ) : (
                <Trophy className="w-6 h-6 text-game-primary" />
              )}
              <span className="text-2xl font-mono font-bold mt-1.5 leading-none">{scorePercent}%</span>
            </div>
          </div>

          <h1 className={`text-sm uppercase font-bold tracking-[0.15em] text-center ${feedbackColor}`}>
            {feedbackText}
          </h1>

          {/* Multiplayer Genius Podium */}
          {selectedMode === 'genius' && (
            <div className="w-full bg-game-card border border-white/5 rounded-2xl p-4 mt-6 space-y-2.5">
              <h4 className="text-[8px] uppercase font-bold text-game-muted tracking-[0.2em] mb-2">Classement Final</h4>
              {[...players].sort((a,b) => b.score - a.score).map((player, idx) => (
                <div key={player.id} className="flex justify-between items-center text-xs py-1.5 border-b border-white/5 last:border-0">
                  <span className="flex items-center gap-2">
                    <span className="w-4 font-mono text-[9px] font-bold text-game-muted">{idx + 1}.</span>
                    <span className="text-game-text font-medium">{player.name}</span>
                  </span>
                  <span className="font-mono text-game-primary font-bold">{player.score} pts</span>
                </div>
              ))}
            </div>
          )}

          {/* Solo Score breakdown */}
          {selectedMode !== 'genius' && (
            <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
              <div className="bg-game-card border border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Réponses</span>
                <p className="text-base font-mono font-bold text-game-success mt-1">{correctCount} / {totalQuestions}</p>
              </div>
              <div className="bg-game-card border border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[8px] uppercase font-bold tracking-wider text-game-muted">Score</span>
                <p className="text-base font-mono font-bold text-game-primary mt-1">+{correctCount * 10} XP</p>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Corrections Block */}
        <div className="bg-game-card border border-white/5 rounded-2xl overflow-hidden mb-6">
          <button
            onClick={() => setShowCorrections(!showCorrections)}
            className="w-full px-5 py-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-game-muted hover:text-game-text transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-game-primary" />
              Voir le Corrigé
            </span>
            {showCorrections ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showCorrections && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-white/5 bg-black/10"
              >
                <div className="p-4 space-y-4 max-h-[260px] overflow-y-auto no-scrollbar">
                  {questions.map((q, qIdx) => {
                    const ans = answers.find(a => a.questionId === q.id);
                    
                    return (
                      <div key={q.id} className="text-xs border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                        <div className="flex gap-2 items-start mb-2">
                          <span className="font-mono font-bold text-game-muted text-[9px] shrink-0 mt-0.5">Q{qIdx + 1}.</span>
                          <span className="font-bold leading-relaxed tracking-wide text-game-text">{q.question}</span>
                        </div>
                        
                        <div className="space-y-1.5 pl-5">
                          {q.responses.map((choice) => {
                            const isUserSelected = ans && ans.choiceId === choice.id;
                            const isRightChoice = choice.is_correct;
                            
                            let choiceBg = 'bg-white/5 border border-white/5';
                            let choiceText = 'text-game-text';
                            let icon = null;

                            if (isRightChoice) {
                              choiceBg = 'bg-game-success/5 border border-game-success/20';
                              choiceText = 'text-game-success font-medium';
                              icon = <Check className="w-3 h-3 text-game-success shrink-0" />;
                            } else if (isUserSelected && !isRightChoice) {
                              choiceBg = 'bg-game-error/5 border border-game-error/20';
                              choiceText = 'text-game-error font-medium';
                              icon = <X className="w-3 h-3 text-game-error shrink-0" />;
                            }

                            return (
                              <div key={choice.id} className={`flex items-center justify-between py-2 px-3 rounded-lg text-[10px] ${choiceBg} ${choiceText}`}>
                                <span className="leading-tight">{choice.response}</span>
                                {icon}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Footer */}
      <div className="grid grid-cols-2 gap-3.5 mt-4">
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleReplay}
          className="w-full py-3 bg-game-primary text-game-bg rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(197,168,128,0.15)] hover:bg-[#DBC19D] transition-all duration-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Rejouer
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleReturnHome}
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-game-muted hover:text-game-text flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          Accueil
        </motion.button>
      </div>
    </div>
  );
};

export default ResultScreen;
