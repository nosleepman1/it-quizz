import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import ChoiceButton from '@/components/game/ChoiceButton';
import TimerRing from '@/components/game/TimerRing';
import LifeBar from '@/components/game/LifeBar';
import { 
  ArrowLeft, LogOut, ArrowRight, User, 
  HelpCircle, Sparkles, XCircle
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

const GameShell = () => {
  const navigate = useNavigate();
  
  const selectedMode = useGameStore((state) => state.selectedMode);
  const gameConfig = useGameStore((state) => state.gameConfig);
  const session = useGameStore((state) => state.session);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const resetGame = useGameStore((state) => state.resetGame);

  // Return to home if no active game session
  useEffect(() => {
    if (!session || !selectedMode) {
      navigate('/');
    }
  }, [session, selectedMode, navigate]);

  if (!session || !selectedMode) return null;

  const { questions, currentIndex, players, survivalLivesRemaining, twelveHitsCorrect } = session;
  const currentQuestion = questions[currentIndex];
  
  // Game state controls
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);

  // Flash Mode Timer States
  const [timerTimeLeft, setTimerTimeLeft] = useState<number>(gameConfig.timePerQuestion || 15);
  const timerRef = useRef<any>(null);

  // Difficulty badge coloring
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-white/5 text-game-muted border-white/5';
    }
  };

  // Timer runner for Flash Mode
  useEffect(() => {
    if (selectedMode !== 'flash' || isAnswered || !currentQuestion) return;

    // Reset time left
    setTimerTimeLeft(gameConfig.timePerQuestion || 15);

    // Set interval ticking every 100ms for smoother animations
    const intervalTime = 100;
    const start = Date.now();
    const durationMs = (gameConfig.timePerQuestion || 15) * 1000;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, (durationMs - elapsed) / 1000);
      
      setTimerTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        handleTimeout();
      }
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, selectedMode, currentQuestion, gameConfig.timePerQuestion]);

  const handleTimeout = () => {
    // Force submit empty answer
    setIsAnswered(true);
    setSelectedChoiceId(-1);
    submitAnswer(-1, gameConfig.timePerQuestion);

    // Auto-advance after 1.2s so user realizes they timed out
    setTimeout(() => {
      handleProceedNext();
    }, 1200);
  };

  const handleChoiceSelect = (choiceId: number) => {
    if (isAnswered) return;
    
    // Stop countdown timer in Flash Mode
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedChoiceId(choiceId);
    setIsAnswered(true);

    const timeSpent = selectedMode === 'flash' 
      ? (gameConfig.timePerQuestion || 15) - timerTimeLeft 
      : undefined;

    // Save choice in global state
    submitAnswer(choiceId, timeSpent);

    // Flash Mode auto-advances quickly (800ms) for high action paced gameplay
    if (selectedMode === 'flash') {
      setTimeout(() => {
        handleProceedNext();
      }, 800);
    }
  };

  const handleProceedNext = () => {
    // Check if session has finished
    const nextIndex = currentIndex + 1;
    
    // Survival mode auto finish if 0 lives remaining
    const sessionRef = useGameStore.getState().session;
    const isOutOfLives = selectedMode === 'survival' && sessionRef?.survivalLivesRemaining === 0;

    if (nextIndex >= questions.length || isOutOfLives) {
      navigate('/play/result');
    } else {
      setSelectedChoiceId(null);
      setIsAnswered(false);
      nextQuestion();
    }
  };

  const handleQuitGame = () => {
    resetGame();
    navigate('/');
  };

  const activePlayer = players.find(p => p.id === session.activePlayerId) || players[0];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-game-bg text-game-text px-6 pt-8 pb-8 flex flex-col justify-between select-none font-sans">
      {/* Game Layout Headers */}
      <div>
        <header className="flex items-center justify-between mb-5">
          <button 
            onClick={() => setShowExitDialog(true)}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-game-muted hover:text-game-text hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-game-muted px-3 py-1 bg-white/5 border border-white/5 rounded-full">
            Question {currentIndex + 1} / {questions.length}
          </span>

          <div className="shrink-0">
            {selectedMode === 'survival' && (
              <LifeBar lives={survivalLivesRemaining ?? 3} />
            )}
            {selectedMode === 'twelve_hits' && (
              <div className="flex items-center gap-1.5 bg-game-success/10 border border-game-success/20 py-1 px-3 rounded-full text-game-success font-bold text-[8px] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{twelveHitsCorrect ?? 0} / 12 Coups</span>
              </div>
            )}
            {selectedMode === 'flash' && (
              <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-game-warning bg-game-warning/10 px-3.5 py-1 rounded-full border border-game-warning/20">
                Flash
              </div>
            )}
            {selectedMode === 'classic' && (
              <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-game-primary bg-game-primary/10 px-3.5 py-1 rounded-full border border-game-primary/20">
                Classic
              </div>
            )}
            {selectedMode === 'genius' && (
              <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-game-primary bg-game-primary/10 px-3.5 py-1 rounded-full border border-game-primary/20">
                Génie
              </div>
            )}
          </div>
        </header>

        {/* 12 Hits Grid tracker bar */}
        {selectedMode === 'twelve_hits' && (
          <div className="grid grid-cols-12 gap-1.5 mb-5">
            {Array.from({ length: 12 }).map((_, idx) => {
              const currentScore = twelveHitsCorrect ?? 0;
              const isFilled = idx < currentScore;
              return (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isFilled 
                      ? 'bg-game-success shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                      : 'bg-white/5 border border-white/5'
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* Multiplayer Player Rotation Display */}
        {selectedMode === 'genius' && activePlayer && (
          <div className="bg-game-card border border-white/5 rounded-2xl p-4 flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-game-primary/10 border border-game-primary/20 flex items-center justify-center text-game-primary">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8px] uppercase font-bold tracking-[0.25em] text-game-muted">Tour Actuel</p>
                <h4 className="text-xs font-bold text-game-text leading-tight">{activePlayer.name}</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase font-bold tracking-[0.25em] text-game-muted">Score</p>
              <h4 className="text-xs font-mono font-bold text-game-primary">{activePlayer.score} pts</h4>
            </div>
          </div>
        )}

        {/* Active flash mode timer ring */}
        {selectedMode === 'flash' && !isAnswered && (
          <div className="flex justify-center mb-5 mt-3">
            <TimerRing duration={gameConfig.timePerQuestion || 15} timeLeft={timerTimeLeft} />
          </div>
        )}

        {/* Question Panel */}
        {currentQuestion && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`q-${currentIndex}`}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-game-card rounded-2xl p-6 mb-5 border border-white/5 mt-4 min-h-[140px] flex flex-col justify-center shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-2 mb-3.5">
              <span className={`text-[7px] uppercase font-bold tracking-widest px-2 py-0.5 border rounded ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            
            <h3 className="text-xs font-bold text-game-text leading-relaxed tracking-wide">
              {currentQuestion.question}
            </h3>

            {/* Time-out visual notifier */}
            {selectedMode === 'flash' && selectedChoiceId === -1 && (
              <div className="absolute inset-0 bg-game-error/5 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center text-game-error animate-pulse border border-game-error/25 z-20">
                <XCircle className="w-8 h-8 mb-1.5" />
                <span className="text-[8px] uppercase font-bold tracking-[0.30em]">Temps Écoulé</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Choice Grid */}
        {currentQuestion && (
          <div className="space-y-3">
            {currentQuestion.responses.map((choice, idx) => {
              const isSelected = selectedChoiceId === choice.id;
              
              // Evaluate correct status for feedback decoration
              let correctStatus: boolean | null = null;
              if (isAnswered) {
                if (choice.is_correct) {
                  correctStatus = true;
                } else if (isSelected) {
                  correctStatus = false;
                }
              }

              return (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChoiceButton
                    text={choice.response}
                    index={idx}
                    selected={isSelected}
                    correct={correctStatus}
                    disabled={isAnswered}
                    onClick={() => handleChoiceSelect(choice.id)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Actions (except for Flash Mode where it auto-advances) */}
      {selectedMode !== 'flash' && (
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {isAnswered ? (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleProceedNext}
                className="w-full py-3.5 bg-game-primary text-game-bg rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(197,168,128,0.15)] hover:bg-[#DBC19D] transition-all duration-300"
              >
                Question Suivante
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            ) : (
              <div className="h-12" /> // placeholder spacer to prevent visual layout shifts
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Quitting confirmation modal */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent showCloseButton={false} className="w-[90%] max-w-sm rounded-2xl bg-game-card border border-white/5 text-game-text p-6 shadow-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="text-sm font-bold uppercase tracking-[0.15em] flex items-center gap-2 mb-2 text-game-text">
              <HelpCircle className="w-4.5 h-4.5 text-game-primary" />
              Quitter la Partie ?
            </DialogTitle>
            <DialogDescription className="text-[10px] text-game-muted leading-relaxed font-medium">
              Attention, votre progression sur ce quiz sera définitivement perdue. Êtes-vous sûr de vouloir abandonner ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-row gap-3">
            <DialogClose asChild>
              <button className="rounded-xl border border-white/5 text-[9px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 py-3.5 flex-1 transition-all duration-300 cursor-pointer">
                Annuler
              </button>
            </DialogClose>
            <button 
              onClick={handleQuitGame}
              className="rounded-xl bg-game-error hover:bg-game-error/90 text-game-text text-[9px] font-bold uppercase tracking-wider py-3.5 flex-1 flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Abandonner
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameShell;
