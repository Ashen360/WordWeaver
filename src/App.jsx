import { useState } from 'react';
import { GameBoard, StartScreen } from './components/index.js';
import './styles/index.css';

/**
 * WordWeaver — Category Word Puzzle Game
 * 
 * A complete React app for playing word association puzzles.
 * Players must find groups of 4 related words from a 4×4 grid.
 * 
 * Architecture:
 * - Data: src/data/playlists.js — Game content organized by difficulty
 * - Logic: src/logic/gameLogic.js — Pure game state functions
 * - State: src/hooks/useGameState.js — React hook for game management
 * - UI: src/components/ — Modular, reusable components
 * - Styles: src/styles/ — CSS with variables and animations
 */

export default function App() {
  const [screen, setScreen] = useState('start');
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [activeDifficulty, setActiveDifficulty] = useState('easy');

  const handleStart = (playlist, difficulty) => {
    setActivePlaylist(playlist);
    setActiveDifficulty(difficulty);
    setScreen('game');
  };

  const handleReturnToMenu = () => {
    setScreen('start');
    setActivePlaylist(null);
  };

  return (
    <main className="app">
      {screen === 'start' ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameBoard
          playlist={activePlaylist}
          difficulty={activeDifficulty}
          onReturnToMenu={handleReturnToMenu}
        />
      )}
    </main>
  );
}
