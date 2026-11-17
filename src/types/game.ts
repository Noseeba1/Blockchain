export type PageId =
  | 'home'
  | 'how-to-play'
  | 'player-entry'
  | 'arena'
  | 'results';

export type ChallengeId =
  | 'build-blockchain'
  | 'spot-change'
  | 'control-systems'
  | 'blockchain-mystery';

export interface BlockItem {
  id: string;
  blockNumber: number;
  data: string;
  previousHash: string;
  currentHash: string;
}

export interface SpotField {
  key: string;
  label: string;
  labelEn: string;
  valueA: string;
  valueB: string;
}

export interface SpotRound {
  id: string;
  title: string;
  description: string;
  fields: SpotField[];
  changedKey: string;
  explanation: string;
}

export interface ControlScenarioOption {
  id: 'centralized' | 'distributed' | 'decentralized';
  label: string;
  labelEn: string;
}

export interface ControlScenario {
  id: string;
  title: string;
  scenario: string;
  options: [ControlScenarioOption, ControlScenarioOption];
  correctOptionId: 'centralized' | 'distributed' | 'decentralized';
  explanation: string;
}

export interface MysteryClue {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  codeSnippet?: string;
}

export interface MysteryQuestionOption {
  id: string;
  label: string;
}

export interface MysteryQuestion {
  id: string;
  prompt: string;
  options: MysteryQuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ChallengeMeta {
  id: ChallengeId;
  order: number;
  title: string;
  titleEn: string;
  concept: string;
  shortDesc: string;
  maxPoints: number;
  questionsCount: number;
  imageUrl: string;
  imageAlt: string;
}

export interface SubmissionRecord {
  itemId: string;
  challengeId: ChallengeId;
  isCorrect: boolean;
  pointsAwarded: number;
  submittedAt: number;
}

export interface ChallengeCompletion {
  challengeId: ChallengeId;
  completed: boolean;
  earnedPoints: number;
  maxPoints: number;
  correctCount: number;
  totalCount: number;
}

export interface AchievementInfo {
  id: 'beginner' | 'explorer' | 'detective' | 'master';
  titleAr: string;
  titleEn: string;
  message: string;
  minScore: number;
}

export interface GameState {
  playerName: string;
  currentPage: PageId;
  activeChallengeIndex: number;
  score: number;
  submissions: Record<string, SubmissionRecord>;
  completedChallenges: Record<ChallengeId, boolean>;
  introSeen: Record<ChallengeId, boolean>;
}
