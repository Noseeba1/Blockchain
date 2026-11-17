import { AnimatePresence, motion } from 'motion/react';
import { ProgressHeader } from '../components/ProgressHeader';
import { Challenge1ChainBuilder } from '../components/challenges/Challenge1ChainBuilder';
import { Challenge2SpotChange } from '../components/challenges/Challenge2SpotChange';
import { Challenge3ControlSystems } from '../components/challenges/Challenge3ControlSystems';
import { Challenge4Mystery } from '../components/challenges/Challenge4Mystery';
import { CHALLENGES_META } from '../data/challenges';
import { ChallengeId, GameState } from '../types/game';

interface CompetitionPageProps {
  gameState: GameState;
  onSelectChallenge: (index: number) => void;
  onDismissIntro: (challengeId: ChallengeId) => void;
  onSubmitItem: (itemId: string, challengeId: ChallengeId, isCorrect: boolean) => void;
  onCompleteChallenge: (challengeId: ChallengeId) => void;
  onViewResults: () => void;
}

export function CompetitionPage({
  gameState,
  onSelectChallenge,
  onDismissIntro,
  onSubmitItem,
  onCompleteChallenge,
  onViewResults,
}: CompetitionPageProps) {
  const activeMeta = CHALLENGES_META[gameState.activeChallengeIndex] ?? CHALLENGES_META[0];

  const handleNextChallenge = () => {
    const nextIdx = gameState.activeChallengeIndex + 1;
    if (nextIdx < CHALLENGES_META.length) {
      onSelectChallenge(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onViewResults();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ProgressHeader
        playerName={gameState.playerName}
        score={gameState.score}
        activeChallengeIndex={gameState.activeChallengeIndex}
        completedChallenges={gameState.completedChallenges}
        onSelectChallenge={onSelectChallenge}
        onViewResults={onViewResults}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMeta.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeMeta.id === 'build-blockchain' && (
            <Challenge1ChainBuilder
              introSeen={gameState.introSeen['build-blockchain']}
              submission={gameState.submissions['chain-order']}
              onDismissIntro={() => onDismissIntro('build-blockchain')}
              onSubmit={onSubmitItem}
              onComplete={() => onCompleteChallenge('build-blockchain')}
              onNextChallenge={handleNextChallenge}
            />
          )}

          {activeMeta.id === 'spot-change' && (
            <Challenge2SpotChange
              introSeen={gameState.introSeen['spot-change']}
              submissions={gameState.submissions}
              onDismissIntro={() => onDismissIntro('spot-change')}
              onSubmit={onSubmitItem}
              onComplete={() => onCompleteChallenge('spot-change')}
              onNextChallenge={handleNextChallenge}
            />
          )}

          {activeMeta.id === 'control-systems' && (
            <Challenge3ControlSystems
              introSeen={gameState.introSeen['control-systems']}
              submissions={gameState.submissions}
              onDismissIntro={() => onDismissIntro('control-systems')}
              onSubmit={onSubmitItem}
              onComplete={() => onCompleteChallenge('control-systems')}
              onNextChallenge={handleNextChallenge}
            />
          )}

          {activeMeta.id === 'blockchain-mystery' && (
            <Challenge4Mystery
              introSeen={gameState.introSeen['blockchain-mystery']}
              submissions={gameState.submissions}
              onDismissIntro={() => onDismissIntro('blockchain-mystery')}
              onSubmit={onSubmitItem}
              onComplete={() => onCompleteChallenge('blockchain-mystery')}
              onFinishCompetition={onViewResults}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
