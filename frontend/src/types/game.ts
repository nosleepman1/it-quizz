import type { QuestionResponse } from './question';

export type GameMode = 'classic' | 'flash' | 'genius' | 'twelve_hits' | 'survival';

export type ScopeLevel = 'theme' | 'category' | 'subcategory' | 'topic';

export interface BreadcrumbItem {
  id: string | number;
  label: string;
  level: ScopeLevel;
}

export interface SelectedScope {
  level: ScopeLevel;
  id: string | number;
  label: string;
  breadcrumb: BreadcrumbItem[];
}

export interface GameConfig {
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  timePerQuestion?: number; // for flash mode
  playerCount?: number;     // for genius mode (multiplayer)
}

export interface Player {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  lives?: number; // for multiplayer survival if needed
}

export interface Answer {
  questionId: string;
  choiceId: number;
  isCorrect: boolean;
  timeSpent?: number;
  playerId?: string; // tracks which player answered in multi-player
}

export interface GameSession {
  questions: QuestionResponse[];
  currentIndex: number;
  answers: Answer[];
  players: Player[];
  startedAt: Date;
  activePlayerId?: string; // for multiplayer turn-based genius mode
  survivalLivesRemaining?: number; // for survival mode
  twelveHitsCorrect?: number; // for twelve hits mode
}

export interface GameStore {
  selectedScope: SelectedScope | null;
  selectedMode: GameMode | null;
  gameConfig: GameConfig;
  session: GameSession | null;
  
  // Actions
  setScope: (scope: SelectedScope | null) => void;
  setMode: (mode: GameMode | null) => void;
  setConfig: (config: Partial<GameConfig>) => void;
  initSession: (questions: QuestionResponse[], customPlayers?: string[]) => void;
  submitAnswer: (choiceId: number, timeSpent?: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}
