import React from 'react';
import { SolvedBanner } from './SolvedBanner.jsx';
import './SolvedList.css';

/**
 * List of solved category banners
 * Props:
 *  - categories {Array}    Array of solved category objects
 */
export function SolvedList({ categories }) {
  if (categories.length === 0) return null;
  
  return (
    <div className="solved-list">
      {categories.map((cat) => (
        <SolvedBanner
          key={cat.category}
          category={cat.category}
          color={cat.color}
          words={cat.words}
        />
      ))}
    </div>
  );
}
