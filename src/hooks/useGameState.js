import { useState, useCallback, useMemo } from "react";
import { gameLogic } from "../logic/gameLogic.js";

/**
 * Custom hook for managing game state
 * @param {Object} playlist - The game playlist
 * @returns {Object} Game state and actions
 */
export function useGameState(playlist) {
  const [gameState, setGameState] = useState(() =>
    gameLogic.buildInitialState(playlist),
  );
  const [feedback, setFeedback] = useState({ message: "", type: "info" });
  const [shakeIds, setShakeIds] = useState([]);

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
  } = gameState;

  // Compute derived values
  const score = useMemo(
    () => gameLogic.computeScore(solvedCategories.length, mistakes),
    [solvedCategories.length, mistakes],
  );

  const status = useMemo(() => {
    if (solvedCategories.length === selectedGroups?.length) {
      return "won";
    } else if (mistakes >= maxMistakes) {
      return "lost";
    }
    return "playing";
  }, [solvedCategories.length, mistakes, maxMistakes, selectedGroups]);

  // Toggle a word's selection
  const handleToggle = useCallback(
    (id) => {
      if (status !== "playing") return;
      setGameState((s) => {
        const already = s.selectedIds.includes(id);
        const newSelected = already
          ? s.selectedIds.filter((x) => x !== id)
          : [...s.selectedIds, id];
        return { ...s, selectedIds: newSelected };
      });
      setFeedback({ message: "", type: "info" });
    },
    [status],
  );

  // Submit guess
  const handleSubmit = useCallback(() => {
    if (selectedIds.length !== 4) {
      setFeedback({ message: "Select exactly 4 words.", type: "info" });
      return;
    }

    const result = gameLogic.checkGuess(selectedIds, wordList);

    if (result.correct) {
      // Correct guess — mark category as solved, remove from grid
      const solvedWords = wordList
        .filter((w) => selectedIds.includes(w.id))
        .map((w) => w.word);

      const newSolvedCategories = [
        ...solvedCategories,
        { category: result.category, color: result.color, words: solvedWords },
      ];

      setGameState((s) => ({
        ...s,
        wordList: s.wordList.filter((w) => !selectedIds.includes(w.id)),
        selectedIds: [],
        solvedCategories: newSolvedCategories,
        lastGuessCorrect: true,
      }));

      // Check if this was the last category
      if (newSolvedCategories.length === selectedGroups?.length) {
        setFeedback({ message: "Puzzle complete! 🎉", type: "correct" });
      } else {
        setFeedback({
          message: `✓ Correct! Category: "${result.category}"`,
          type: "correct",
        });
      }
    } else {
      // Wrong — shake cards, increment mistakes, maybe unlock hint
      setShakeIds([...selectedIds]);
      setTimeout(() => setShakeIds([]), 500);

      const newMistakes = mistakes + 1;

      setGameState((s) => ({
        ...s,
        mistakes: newMistakes,
        selectedIds: [],
        hintsUnlocked: newMistakes >= 2,
        lastGuessCorrect: false,
      }));

      // Check if this was the last mistake
      if (newMistakes >= maxMistakes) {
        setFeedback({ message: "Out of attempts!", type: "wrong" });
      } else {
        setFeedback({ message: "✗ Not quite — try again.", type: "wrong" });
      }
    }
  }, [
    selectedIds,
    wordList,
    solvedCategories,
    mistakes,
    maxMistakes,
    selectedGroups,
  ]);

  // Shuffle remaining words
  const handleShuffle = useCallback(() => {
    setGameState((s) => ({
      ...s,
      wordList: gameLogic.shuffle(s.wordList),
      selectedIds: [],
    }));
  }, []);

  // Show hint
  const handleHint = useCallback(() => {
    if (!hintsUnlocked) return;

    // 1. Guard: Check if hints are exhausted
    if (hintUses >= maxHints) {
      setFeedback({ message: "No hints remaining.", type: "hint" });
      return;
    }

    // 2. Guard: Check if the user has actually selected words
    if (selectedIds.length === 0) {
      setFeedback({ message: "Select 4 words to get a hint.", type: "info" });
      return; // Exit early WITHOUT incrementing hintUses
    }

    // 3. Get the hint from logic
    const hint = gameLogic.getHint(selectedIds, wordList, hintUses, maxHints);

    if (hint) {
      // 4. Success: Only increment the counter if a hint was actually delivered
      setGameState((prev) => ({
        ...prev,
        hintUses: prev.hintUses + 1,
      }));

      setFeedback({
        message: hint,
        type: "hint",
      });
    }
  }, [selectedIds, wordList, hintUses, maxHints, hintsUnlocked]);

  // Deselect all
  const handleDeselect = useCallback(() => {
    setGameState((s) => ({ ...s, selectedIds: [] }));
    setFeedback({ message: "", type: "info" });
  }, []);

  // Reset game
  const handleReset = useCallback(() => {
    setGameState(gameLogic.buildInitialState(playlist));
    setFeedback({ message: "", type: "info" });
    setShakeIds([]);
  }, [playlist]);

  return {
    // State
    wordList,
    selectedIds,
    solvedCategories,
    mistakes,
    maxMistakes,
    hintsUnlocked,
    hintUses,
    maxHints,
    status,
    selectedGroups,
    score,
    feedback,
    shakeIds,
    // Actions
    handleToggle,
    handleSubmit,
    handleShuffle,
    handleHint,
    handleDeselect,
    handleReset,
  };
}
