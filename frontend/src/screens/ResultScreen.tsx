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
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-4 pt-6 pb-8 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="w-10" />
          <span className="text-xs uppercase font-bold tracking-widest text-game-muted">
            Résultats
          </span>
          <div className="w-10" />
        </header>

        {/* Circular Animated Performance Arc & Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative flex items-center justify-center w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle
                className="stroke-white/5"
                fill="transparent"
                strokeWidth={8}
                r={54}
                cx={72}
                cy={72}
              />
              <motion.circle
                className={scorePercent >= 80 ? 'stroke-game-success' : scorePercent >= 50 ? 'stroke-game-warning' : 'stroke-game-error'}
                fill="transparent"
                strokeWidth={8}
                strokeLinecap="round"
                r={54}
                cx={72}
                cy={72}
                initial={{ strokeDasharray: '0 340' }}
                animate={{ strokeDasharray: `${(scorePercent / 100) * 340} 340` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              {selectedMode === 'survival' && survivalLivesRemaining === 0 ? (
                <ShieldAlert className="w-8 h-8 text-game-error filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
              ) : (
                <Trophy className="w-8 h-8 text-game-warning filter drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              )}
              <span className="text-3xl font-mono font-black mt-1 leading-none">{scorePercent}%</span>
            </div>
          </div>

          <h1 className={`text-xl uppercase font-black tracking-tight text-center ${feedbackColor}`}>
            {feedbackText}
          </h1>

          {/* Multiplayer Genius Podium */}
          {selectedMode === 'genius' && (
            <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 mt-6 space-y-2">
              <h4 className="text-[10px] uppercase font-bold text-game-muted tracking-wider mb-2">Classement Final</h4>
              {[...players].sort((a,b) => b.score - a.score).map((player, idx) => (
                <div key={player.id} className="flex justify-between items-center text-xs font-semibold py-1 border-b border-white/5 last:border-0">
                  <span className="flex items-center gap-2">
                    <span className="w-4 font-mono text-[10px] font-black text-game-muted">{idx + 1}.</span>
                    <span>{player.name}</span>
                  </span>
                  <span className="font-mono text-game-secondary font-black">{player.score} pts</span>
                </div>
              ))}
            </div>
          )}

          {/* Solo Score breakdown */}
          {selectedMode !== 'genius' && (
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 text-center">
                <span className="text-[9px] uppercase font-bold text-game-muted">Réponses Correctes</span>
                <p className="text-xl font-mono font-black text-game-success mt-1">{correctCount} / {totalQuestions}</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 text-center">
                <span className="text-[9px] uppercase font-bold text-game-muted">Points Gagnés</span>
                <p className="text-xl font-mono font-black text-game-secondary mt-1">{correctCount * 10} pts</p>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Corrections Block */}
        <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-6">
          <button
            onClick={() => setShowCorrections(!showCorrections)}
            className="w-full px-5 py-4 flex items-center justify-between text-xs font-black uppercase tracking-wider text-game-muted hover:text-game-text transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-game-primary" />
              Voir les Corrections
            </span>
            {showCorrections ? <ChevronUp className="w-4.5 h-4.5" /> : <ChevronDown className="w-4.5 h-4.5" />}
          </button>

          <AnimatePresence>
            {showCorrections && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-white/5 bg-black/10"
              >
                <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                  {questions.map((q, qIdx) => {
                    const ans = answers.find(a => a.questionId === q.id);
                    
                    return (
                      <div key={q.id} className="text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <div className="flex gap-2 items-start mb-2">
                          <span className="font-mono font-bold text-game-muted text-[10px] shrink-0 mt-0.5">Q{qIdx + 1}.</span>
                          <span className="font-bold leading-tight">{q.question}</span>
                        </div>
                        
                        <div className="space-y-1.5 pl-6">
                          {q.responses.map((choice) => {
                            const isUserSelected = ans && ans.choiceId === choice.id;
                            const isRightChoice = choice.is_correct;
                            
                            let choiceBg = 'bg-white/5 border border-white/5';
                            let choiceText = 'text-game-text';
                            let icon = null;

                            if (isRightChoice) {
                              choiceBg = 'bg-game-success/10 border border-game-success/30';
                              choiceText = 'text-game-success font-semibold';
                              icon = <Check className="w-3.5 h-3.5 text-game-success shrink-0" />;
                            } else if (isUserSelected && !isRightChoice) {
                              choiceBg = 'bg-game-error/10 border border-game-error/30';
                              choiceText = 'text-game-error font-semibold';
                              icon = <X className="w-3.5 h-3.5 text-game-error shrink-0" />;
                            }

                            return (
                              <div key={choice.id} className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-[11px] ${choiceBg} ${choiceText}`}>
                                <span>{choice.response}</span>
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
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={handleReplay}
          className="w-full py-4 bg-gradient-to-r from-game-primary to-game-secondary rounded-2xl text-xs font-black uppercase tracking-wider text-game-text flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(124,58,237,0.3)] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Rejouer
        </button>
        <button
          onClick={handleReturnHome}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-wider text-game-muted hover:text-game-text flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Accueil
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
