/**
 * Game Logic Module
 * Pure functions for game state management - no React dependencies
 */

export const gameLogic = {
  /**
   * Randomly select 4 groups from the playlist, then flatten all words
   * from those groups into a single array and shuffle using Fisher-Yates.
   * @param {object} playlist - The loaded playlist JSON
   * @returns {Array<{id, word, category, color}>} Shuffled word objects
   */
  buildWordList(playlist) {
    // Randomly select 4 groups from all available groups
    const selectedGroups = this.shuffle([...playlist.groups]).slice(0, 4);

    const words = [];
    selectedGroups.forEach((group) => {
      group.words.forEach((word) => {
        words.push({
          id: `${group.category}-${word}`, // Unique ID
          word,
          category: group.category,
          color: group.color, // For solved reveal color
        });
      });
    });
    return this.shuffle(words);
  },

  /**
   * Fisher-Yates shuffle — true random shuffle, non-mutating.
   */
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  /**
   * Check if exactly 4 selected words all share the same category.
   * @param {Array<string>} selectedIds - IDs of selected words
   * @param {Array<object>} wordList - Full word list
   * @returns {{ correct: boolean, category: string|null, color: string|null }}
   */
  checkGuess(selectedIds, wordList) {
    if (selectedIds.length !== 4) return { correct: false, category: null };

    const selected = wordList.filter((w) => selectedIds.includes(w.id));
    const categories = selected.map((w) => w.category);
    const allSame = categories.every((c) => c === categories[0]);

    return {
      correct: allSame,
      category: allSame ? categories[0] : null,
      color: allSame ? selected[0].color : null,
    };
  },

  /**
   * Determine a hint after the player has made 2+ mistakes.
   * Returns the category name of the most-represented unsolved group
   * among the currently selected words.
   * @param {Array<string>} selectedIds
   * @param {Array<object>} wordList
   * @returns {string|null}
   */
  getHint(selectedIds, wordList, hintUses, maxHints) {
    if (hintUses >= maxHints) {
      return "No hints remaining.";
    }

    if (selectedIds.length === 0) {
      return "Select 4 words to get a hint.";
    }

    const selected = wordList.filter((w) => selectedIds.includes(w.id));
    const categoryCount = {};

    selected.forEach(({ category }) => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const topCategory = Object.entries(categoryCount).sort(
      ([, a], [, b]) => b - a,
    )[0];

    if (!topCategory) return null;

    return `Hint: At least one word belongs to "${topCategory[0]}"`;
  },

  /**
   * Build initial game state from a playlist.
   */
  buildInitialState(playlist) {
    // Randomly select 4 groups from all available groups
    const selectedGroups = this.shuffle([...playlist.groups]).slice(0, 4);

    const words = [];
    selectedGroups.forEach((group) => {
      group.words.forEach((word) => {
        words.push({
          id: `${group.category}-${word}`, // Unique ID
          word,
          category: group.category,
          color: group.color, // For solved reveal color
        });
      });
    });

    return {
      wordList: this.shuffle(words),
      selectedGroups, // Track which 4 groups were selected for this game
      selectedIds: [],
      solvedCategories: [], // Array of {category, color, words}
      mistakes: 0,
      maxMistakes: 4,
      hintsUnlocked: false,
      status: "playing", // 'playing' | 'won' | 'lost'
      lastGuessCorrect: null, // null | true | false
      shakeActive: false,
      hintUses: 0,
      maxHints: 3,
    };
  },

  /**
   * Compute score: base points minus mistake penalty.
   */
  computeScore(solvedCount, mistakes) {
    const basePoints = solvedCount * 250;
    const penalty = mistakes * 50;
    return Math.max(0, basePoints - penalty);
  },
};
