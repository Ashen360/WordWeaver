import React from 'react';
import { useSounds } from '../../utils/sounds.js';
import './Button.css';

/**
 * Reusable button component with sound effects
 * Props:
 *  - children {ReactNode}  Button content
 *  - variant {string}      'primary', 'secondary', or 'danger'
 *  - onClick {function}    Click handler
 *  - disabled {boolean}    Whether button is disabled
 *  - className {string}    Additional CSS classes
 */
export function Button({ 
  children, 
  variant = 'secondary', 
  onClick, 
  disabled = false,
  className = '' 
}) {
  const { playButtonClick, playButtonHover } = useSounds();

  const handleClick = () => {
    playButtonClick();
    if (onClick) onClick();
  };

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => !disabled && playButtonHover()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
