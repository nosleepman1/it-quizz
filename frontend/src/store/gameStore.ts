import { create } from 'zustand';
import type { GameStore, GameConfig, Answer, Player, GameSession } from '@/types/game';

const DEFAULT_CONFIG: GameConfig = {
  questionCount: 10,
  difficulty: 'mixed',
  timePerQuestion: 15,
  playerCount: 2
};

export const useGameStore = create<GameStore>((set, get) => ({
  selectedScope: null,
  selectedMode: null,
  gameConfig: DEFAULT_CONFIG,
  session: null,

  setScope: (scope) => set({ selectedScope: scope }),
  setMode: (mode) => set({ selectedMode: mode }),
  setConfig: (config) => set((state) => ({
    gameConfig: { ...state.gameConfig, ...config }
  })),

  initSession: (questions, customPlayers) => {
    const { selectedMode, gameConfig } = get();
    if (!selectedMode) return;

    // Build players array
    let players: Player[] = [];
    if (selectedMode === 'genius') {
      const names = customPlayers && customPlayers.length > 0
        ? customPlayers
        : Array.from({ length: gameConfig.playerCount || 2 }, (_, i) => `Joueur ${i + 1}`);
      players = names.map((name, index) => ({
        id: `player-${index + 1}`,
        name,
        score: 0
      }));
    } else {
      players = [{ id: 'player-solo', name: 'Joueur', score: 0 }];
    }

    const session: GameSession = {
      questions: questions.slice(0, gameConfig.questionCount),
      currentIndex: 0,
      answers: [],
      players,
      startedAt: new Date(),
      activePlayerId: players[0]?.id,
      survivalLivesRemaining: selectedMode === 'survival' ? 3 : undefined,
      twelveHitsCorrect: selectedMode === 'twelve_hits' ? 0 : undefined
    };

    set({ session });
  },

  submitAnswer: (choiceId, timeSpent) => {
    const { session, selectedMode } = get();
    if (!session) return;

    const currentQuestion = session.questions[session.currentIndex];
    if (!currentQuestion) return;

    const chosenChoice = currentQuestion.responses.find(r => r.id === choiceId);
    const isCorrect = chosenChoice ? chosenChoice.is_correct : false;

    // Create the Answer object
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      choiceId,
      isCorrect,
      timeSpent,
      playerId: session.activePlayerId
    };

    // Prepare update structures
    const updatedAnswers = [...session.answers, newAnswer];
    let updatedPlayers = [...session.players];
    let updatedSurvivalLives = session.survivalLivesRemaining;
    let updatedTwelveHitsCorrect = session.twelveHitsCorrect;

    // Apply mode-specific score/state adjustments
    if (selectedMode === 'genius') {
      // Find active player and adjust score
      updatedPlayers = session.players.map(p => {
        if (p.id === session.activePlayerId) {
          return { ...p, score: isCorrect ? p.score + 10 : p.score };
        }
        return p;
      });
    } else {
      // Solo modes score adjustment
      updatedPlayers = session.players.map(p => {
        if (p.id === 'player-solo') {
          return { ...p, score: isCorrect ? p.score + 10 : p.score };
        }
        return p;
      });
    }

    if (selectedMode === 'survival') {
      if (!isCorrect && updatedSurvivalLives !== undefined) {
        updatedSurvivalLives = Math.max(0, updatedSurvivalLives - 1);
      }
    }

    if (selectedMode === 'twelve_hits') {
      if (isCorrect && updatedTwelveHitsCorrect !== undefined) {
        updatedTwelveHitsCorrect += 1;
      }
    }

    // Determine the next player in Genius mode
    let nextPlayerId = session.activePlayerId;
    if (selectedMode === 'genius' && session.players.length > 1) {
      const activeIdx = session.players.findIndex(p => p.id === session.activePlayerId);
      const nextIdx = (activeIdx + 1) % session.players.length;
      nextPlayerId = session.players[nextIdx].id;
    }

    const updatedSession: GameSession = {
      ...session,
      answers: updatedAnswers,
      players: updatedPlayers,
      activePlayerId: nextPlayerId,
      survivalLivesRemaining: updatedSurvivalLives,
      twelveHitsCorrect: updatedTwelveHitsCorrect
    };

    // If survival lives are 0, force game completion by setting index to end
    if (selectedMode === 'survival' && updatedSurvivalLives === 0) {
      updatedSession.currentIndex = updatedSession.questions.length;
    }

    set({ session: updatedSession });
  },

  nextQuestion: () => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        currentIndex: session.currentIndex + 1
      }
    });
  },

  resetGame: () => {
    set({ session: null });
  }
}));
