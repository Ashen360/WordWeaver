import React from 'react';
import { WordCard } from './WordCard.jsx';
import './WordGrid.css';

/**
 * The 4×4 grid of WordCards.
 * Props:
 *  - words {Array}         All unsolved word objects
 *  - selectedIds {Array}   Currently selected word IDs
 *  - shakeIds {Array}      IDs of cards to animate (wrong guess)
 *  - disabled {boolean}    If true, no card interaction allowed
 *  - onToggle {function}   Called with word.id when a card is clicked
 */
export function WordGrid({ words, selectedIds, shakeIds, disabled, onToggle }) {
  return (
    <div className="word-grid" role="group" aria-label="Word puzzle grid">
      {words.map((w) => (
        <WordCard
          key={w.id}
          word={w.word}
          selected={selectedIds.includes(w.id)}
          shake={shakeIds.includes(w.id)}
          disabled={
            disabled ||
            // Prevent selecting a 5th word unless it's already selected
            (!selectedIds.includes(w.id) && selectedIds.length >= 4)
          }
          onSelect={() => onToggle(w.id)}
        />
      ))}
    </div>
  );
}
