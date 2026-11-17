/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { CompetitionPage } from './pages/CompetitionPage';
import { HomePage } from './pages/HomePage';
import { HowToPlayPage } from './pages/HowToPlayPage';
import { PlayerEntryPage } from './pages/PlayerEntryPage';
import { ResultsPage } from './pages/ResultsPage';
import { ChallengeId, GameState, PageId } from './types/game';
import { POINTS_PER_CORRECT } from './utils/scoring';
import {
  areAllChallengesCompleted,
  createInitialGameState,
  loadLocalGameState,
  saveLocalGameState,
} from './utils/storage';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => loadLocalGameState());

  useEffect(() => {
    saveLocalGameState(gameState);
  }, [gameState]);

  const hasPlayer = gameState.playerName.trim().length > 0;
  const allCompleted = areAllChallengesCompleted(gameState.completedChallenges);

  const navigateTo = (page: PageId) => {
    setGameState((prev) => ({
      ...prev,
      currentPage: page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCompetition = () => {
    if (hasPlayer) {
      navigateTo(allCompleted ? 'results' : 'arena');
    } else {
      navigateTo('player-entry');
    }
  };

  const handleConfirmPlayer = (name: string) => {
    setGameState((prev) => {
      // If entering a new name after finishing or changing player, start a fresh run
      const isSamePlayer = prev.playerName.trim() === name.trim();
      if (isSamePlayer) {
        return {
          ...prev,
          playerName: name,
          currentPage: 'arena',
        };
      }
      const fresh = createInitialGameState();
      return {
        ...fresh,
        playerName: name,
        currentPage: 'arena',
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChallenge = (index: number) => {
    setGameState((prev) => ({
      ...prev,
      activeChallengeIndex: index,
      currentPage: 'arena',
    }));
  };

  const handleDismissIntro = (challengeId: ChallengeId) => {
    setGameState((prev) => ({
      ...prev,
      introSeen: {
        ...prev.introSeen,
        [challengeId]: true,
      },
    }));
  };

  const handleSubmitItem = (
    itemId: string,
    challengeId: ChallengeId,
    isCorrect: boolean
  ) => {
    setGameState((prev) => {
      // Prevent repeated submissions from awarding duplicate points
      if (prev.submissions[itemId]) {
        return prev;
      }
      const pointsAwarded = isCorrect ? POINTS_PER_CORRECT : 0;
      return {
        ...prev,
        score: prev.score + pointsAwarded,
        submissions: {
          ...prev.submissions,
          [itemId]: {
            itemId,
            challengeId,
            isCorrect,
            pointsAwarded,
            submittedAt: Date.now(),
          },
        },
      };
    });
  };

  const handleCompleteChallenge = (challengeId: ChallengeId) => {
    setGameState((prev) => ({
      ...prev,
      completedChallenges: {
        ...prev.completedChallenges,
        [challengeId]: true,
      },
    }));
  };

  const handleReplay = () => {
    setGameState((prev) => {
      const fresh = createInitialGameState();
      return {
        ...fresh,
        playerName: prev.playerName,
        currentPage: prev.playerName.trim() ? 'arena' : 'player-entry',
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="arena-grid-bg flex min-h-screen flex-col text-slate-100">
      <Navbar
        currentPage={gameState.currentPage}
        hasPlayer={hasPlayer}
        allCompleted={allCompleted}
        onNavigate={navigateTo}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 sm:px-6 sm:pt-8">
        {gameState.currentPage === 'home' && (
          <HomePage
            hasPlayer={hasPlayer}
            onStartCompetition={handleStartCompetition}
            onNavigate={navigateTo}
          />
        )}

        {gameState.currentPage === 'how-to-play' && (
          <HowToPlayPage
            hasPlayer={hasPlayer}
            onStartCompetition={handleStartCompetition}
            onNavigate={navigateTo}
          />
        )}

        {gameState.currentPage === 'player-entry' && (
          <PlayerEntryPage
            existingName={gameState.playerName}
            onConfirmPlayer={handleConfirmPlayer}
            onContinueExisting={() => navigateTo('arena')}
          />
        )}

        {gameState.currentPage === 'arena' &&
          (hasPlayer ? (
            <CompetitionPage
              gameState={gameState}
              onSelectChallenge={handleSelectChallenge}
              onDismissIntro={handleDismissIntro}
              onSubmitItem={handleSubmitItem}
              onCompleteChallenge={handleCompleteChallenge}
              onViewResults={() => navigateTo('results')}
            />
          ) : (
            <PlayerEntryPage
              existingName={gameState.playerName}
              onConfirmPlayer={handleConfirmPlayer}
              onContinueExisting={() => navigateTo('arena')}
            />
          ))}

        {gameState.currentPage === 'results' && (
          <ResultsPage
            gameState={gameState}
            onReplay={handleReplay}
            onNavigate={navigateTo}
            onReturnToArena={() => navigateTo('arena')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
