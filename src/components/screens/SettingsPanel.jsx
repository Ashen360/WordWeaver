import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/sounds.js';
import { useSounds } from '../../utils/sounds.js';
import './SettingsPanel.css';

/**
 * Settings Panel - Configure game settings
 * Props:
 *  - onClose {function} - Called to close the panel
 */
export function SettingsPanel({ onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('wordweaver_theme');
    return saved ? saved === 'dark' : true;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => soundManager.enabled);
  const [volume, setVolume] = useState(() => soundManager.volume * 100);
  const { playButtonClick, playButtonHover } = useSounds();

  useEffect(() => {
    // Apply theme
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('wordweaver_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggleSound = () => {
    playButtonClick();
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume / 100);
    localStorage.setItem('wordweaver_volume', newVolume.toString());
  };

  const handleThemeToggle = () => {
    playButtonClick();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="settings-overlay" onClick={() => { playButtonClick(); onClose(); }}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button 
            className="close-btn" 
            onClick={() => { playButtonClick(); onClose(); }}
            onMouseEnter={playButtonHover}
          >
            ✕
          </button>
        </div>

        <div className="settings-content">
          {/* Theme Toggle */}
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Theme</span>
              <span className="setting-value">{isDarkMode ? 'Dark' : 'Light'}</span>
            </div>
            <button
              className="toggle-btn"
              onClick={handleThemeToggle}
              onMouseEnter={playButtonHover}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Sound Effects</span>
              <span className="setting-value">{soundEnabled ? 'On' : 'Off'}</span>
            </div>
            <button
              className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
              onClick={handleToggleSound}
              onMouseEnter={playButtonHover}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="setting-item volume-item">
            <div className="setting-info">
              <span className="setting-label">Volume</span>
              <span className="setting-value">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              disabled={!soundEnabled}
            />
          </div>
        </div>

        <div className="settings-footer">
          <p>WordWeaver v1.0</p>
        </div>
      </div>
    </div>
  );
}
