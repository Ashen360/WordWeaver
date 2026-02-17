import React, { useEffect } from "react";
import { useGameState } from "../../hooks/useGameState.js";
import { useSounds } from "../../utils/sounds.js";
import { WordGrid } from "./WordGrid.jsx";
import { SolvedList } from "./SolvedList.jsx";
import { Feedback } from "./Feedback.jsx";
import { Button } from "../ui/Button.jsx";
import "./GameBoard.css";

/**
 * Main game screen, rendered while status === 'playing' or showing end state.
 * Props:
 *  - playlist {Object}     The game playlist
 *  - difficulty {string}   Current difficulty level
 *  - onReturnToMenu {function} Callback to return to start screen
 */
export function GameBoard({ playlist, difficulty, onReturnToMenu }) {
  const {
    wordList,
    selectedGroups,
    selectedIds,
    solvedCategories,
    mistakes,
    maxMistakes,
    hintsUnlocked,
    hintUses,
    maxHints,
    status,
    score,
    feedback,
    shakeIds,
    handleToggle,
    handleSubmit,
    handleShuffle,
    handleHint,
    handleDeselect,
    handleReset,
  } = useGameState(playlist);

  const {
    playCorrect,
    playWrong,
    playWin,
    playLose,
    playShuffle,
    playButtonHover,
    playButtonClick,
  } = useSounds();

  // Track previous status to detect changes
  const prevStatusRef = React.useRef(null);

  useEffect(() => {
    // Play sounds based on game status changes
    if (prevStatusRef.current !== status) {
      if (status === "won") {
        playWin();
      } else if (status === "lost") {
        playLose();
      }
      prevStatusRef.current = status;
    }
  }, [status, playWin, playLose]);

  // Track mistakes and solved count for sounds
  const prevMistakesRef = React.useRef(0);
  const prevSolvedRef = React.useRef(0);

  useEffect(() => {
    // Play wrong sound when mistakes increase
    if (mistakes > prevMistakesRef.current && mistakes < maxMistakes) {
      playWrong();
    }
    prevMistakesRef.current = mistakes;

    // Play correct sound when solved categories increase
    if (solvedCategories.length > prevSolvedRef.current) {
      playCorrect();
    }
    prevSolvedRef.current = solvedCategories.length;
  }, [mistakes, solvedCategories.length, maxMistakes, playWrong, playCorrect]);

  // Wrapped handlers with sounds
  const handleShuffleWithSound = () => {
    playShuffle();
    handleShuffle();
  };

  const handleResetWithSound = () => {
    playButtonClick();
    handleReset();
  };

  // Render: End Screen
  if (status === "won" || status === "lost") {
    return (
      <div className="end-screen">
        <div>
          <p className={`end-title ${status}`}>
            {status === "won" ? "Victory!" : "Defeated"}
          </p>
          <p className="end-sub">
            {status === "won"
              ? "All groups found!"
              : `You ran out of attempts. ${
                  selectedGroups?.length - solvedCategories.length
                } group(s) unsolved.`}
          </p>
        </div>

        <div>
          <div className="end-score">{score}</div>
          <div className="end-score-label">Final Score</div>
        </div>

        <div className="end-solved-list">
          <SolvedList categories={solvedCategories} />
        </div>

        <div className="controls">
          <Button variant="primary" onClick={handleResetWithSound}>
            Play Again
          </Button>
          <Button variant="secondary" onClick={onReturnToMenu}>
            Menu
          </Button>
        </div>
      </div>
    );
  }

  // Render: Playing Screen
  return (
    <div className="game-wrapper">
      {/* Header row */}
      <div className="game-header">
        <p className="game-title">
          {difficulty.toUpperCase()} · {playlist.title}
        </p>
        <div className="game-stats">
          {/* Score */}
          <div className="score-row">
            <span>Score</span>
            <span className="score-value">{score}</span>
          </div>
          {/* Mistake pips */}
          <div className="mistake-row">
            {Array.from({ length: maxMistakes }).map((_, i) => (
              <span
                key={i}
                className={`mistake-pip ${i < mistakes ? "filled" : ""}`}
              />
            ))}
          </div>

          {/* Hint pips */}
          <div className="hint-row">
            <span className="stat-label">Hints: </span>
            {Array.from({ length: maxHints }).map((_, i) => (
              <span
                key={`hint-${i}`}
                className={`hint-pip ${i < hintUses ? "used" : "available"}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 2px",
                  backgroundColor: i < hintUses ? "#ccc" : "#ffd700", // Silver if used, Gold if available
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Solved category banners */}
      <SolvedList categories={solvedCategories} />

      {/* Word grid */}
      <WordGrid
        words={wordList}
        selectedIds={selectedIds}
        shakeIds={shakeIds}
        disabled={status !== "playing"}
        onToggle={handleToggle}
      />

      {/* Feedback message */}
      <Feedback
        message={feedback.message}
        type={feedback.type}
        fallback={`Select 4 words · ${selectedIds.length}/4 selected`}
      />

      {/* Controls row */}
      <div className="controls">
        <Button variant="secondary" onClick={handleDeselect}>
          Deselect
        </Button>
        <Button variant="secondary" onClick={handleShuffleWithSound}>
          Shuffle
        </Button>
        {hintsUnlocked && (
          <Button
            variant="secondary"
            onClick={handleHint}
            disabled={!hintsUnlocked || hintUses >= maxHints}
          >
            Hint ({maxHints - hintUses} left)
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={selectedIds.length !== 4}
          className={selectedIds.length !== 4 ? "btn-disabled" : ""}
        >
          Submit
        </Button>
      </div>

      {/* Back to menu */}
      <button
        className="back-to-menu"
        onClick={() => {
          playButtonClick();
          onReturnToMenu();
        }}
        onMouseEnter={playButtonHover}
      >
        ← Back to Menu
      </button>
    </div>
  );
}
