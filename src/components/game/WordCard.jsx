import React from 'react';
import { useSounds } from '../../utils/sounds.js';
import './WordCard.css';

/**
 * Single clickable word tile.
 * Props:
 *  - word {string}         The word to display
 *  - selected {boolean}    Whether this card is currently selected
 *  - disabled {boolean}    Not clickable (game over, 4 already selected, etc.)
 *  - shake {boolean}       Trigger shake animation on wrong guess
 *  - onSelect {function}   Callback when card is clicked
 */
export function WordCard({ word, selected, disabled, shake, onSelect }) {
  const { playWordSelect, playWordDeselect, playButtonHover } = useSounds();

  const handleClick = () => {
    if (!disabled) {
      if (selected) {
        playWordDeselect();
      } else {
        playWordSelect();
      }
      onSelect();
    }
  };

  return (
    <button
      className={`word-card ${selected ? 'selected' : ''} ${shake ? 'shake' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => !disabled && playButtonHover()}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Word: ${word}${selected ? ' (selected)' : ''}`}
    >
      {selected && <span className="selected-dot" aria-hidden="true" />}
      <span className="word-card-inner">{word}</span>
    </button>
  );
}
