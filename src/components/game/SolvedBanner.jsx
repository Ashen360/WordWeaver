import React from 'react';
import './SolvedBanner.css';

/**
 * Banner showing a solved category
 * Props:
 *  - category {string}     Category name
 *  - color {string}        Category color
 *  - words {Array}         Array of words in this category
 */
export function SolvedBanner({ category, color, words }) {
  return (
    <div 
      className="solved-banner"
      style={{
        background: `${color}18`,
        borderColor: `${color}50`,
      }}
    >
      <span 
        className="solved-category"
        style={{ color }}
      >
        {category}
      </span>
      <span className="solved-words">{words.join(', ')}</span>
    </div>
  );
}
