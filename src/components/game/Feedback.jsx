import React from 'react';
import './Feedback.css';

/**
 * Feedback message display
 * Props:
 *  - message {string}      Message to display
 *  - type {string}         'correct', 'wrong', 'hint', or 'info'
 *  - fallback {string}     Message to show when main message is empty
 */
export function Feedback({ message, type, fallback }) {
  const displayMessage = message || fallback;
  
  return (
    <div 
      className={`feedback feedback-${type}`}
      role="status" 
      aria-live="polite"
    >
      {displayMessage}
    </div>
  );
}
