import { ChallengeId, GameState, PageId } from '../types/game';

const STORAGE_KEY = 'blockchain_arena_local_v1';

const VALID_PAGES: PageId[] = [
  'home',
  'how-to-play',
  'player-entry',
  'arena',
  'results',
];

export const createInitialGameState = (): GameState => ({
  playerName: '',
  currentPage: 'home',
  activeChallengeIndex: 0,
  score: 0,
  submissions: {},
  completedChallenges: {
    'build-blockchain': false,
    'spot-change': false,
    'control-systems': false,
    'blockchain-mystery': false,
  },
  introSeen: {
    'build-blockchain': false,
    'spot-change': false,
    'control-systems': false,
    'blockchain-mystery': false,
  },
});

export function loadLocalGameState(): GameState {
  if (typeof window === 'undefined') {
    return createInitialGameState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialGameState();
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') {
      return createInitialGameState();
    }
    const data = parsed as Partial<GameState>;
    const base = createInitialGameState();

    const safePage =
      data.currentPage && VALID_PAGES.includes(data.currentPage)
        ? data.currentPage
        : 'home';

    const safeIndex =
      typeof data.activeChallengeIndex === 'number' &&
      Number.isInteger(data.activeChallengeIndex) &&
      data.activeChallengeIndex >= 0 &&
      data.activeChallengeIndex < 4
        ? data.activeChallengeIndex
        : 0;

    return {
      ...base,
      playerName: typeof data.playerName === 'string' ? data.playerName : '',
      currentPage: safePage,
      activeChallengeIndex: safeIndex,
      score:
        typeof data.score === 'number' && Number.isFinite(data.score)
          ? data.score
          : 0,
      completedChallenges: {
        ...base.completedChallenges,
        ...(data.completedChallenges && typeof data.completedChallenges === 'object'
          ? data.completedChallenges
          : {}),
      },
      introSeen: {
        ...base.introSeen,
        ...(data.introSeen && typeof data.introSeen === 'object'
          ? data.introSeen
          : {}),
      },
      submissions:
        data.submissions && typeof data.submissions === 'object'
          ? data.submissions
          : {},
    };
  } catch {
    return createInitialGameState();
  }
}

export function saveLocalGameState(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or restricted-mode errors gracefully
  }
}

export function clearLocalGameState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors gracefully
  }
}

export function areAllChallengesCompleted(completed: Record<ChallengeId, boolean>): boolean {
  return (
    completed['build-blockchain'] &&
    completed['spot-change'] &&
    completed['control-systems'] &&
    completed['blockchain-mystery']
  );
}
