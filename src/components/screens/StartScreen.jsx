import React, { useState, useCallback } from 'react';
import { PLAYLISTS, DIFFICULTY_META } from '../../data/playlists/index.js';
import { useSounds } from '../../utils/sounds.js';
import { PlaylistEditor } from './PlaylistEditor.jsx';
import { PlaylistBrowser } from './PlaylistBrowser.jsx';
import { SettingsPanel } from './SettingsPanel.jsx';
import './StartScreen.css';

/**
 * Start Screen with Play, Create, and Browse modes
 * Props:
 *  - onStart(playlist, difficulty) — callback to begin game
 */
export function StartScreen({ onStart }) {
  const [activeTab, setActiveTab] = useState('play'); // 'play' | 'create' | 'browse'
  const [difficulty, setDifficulty] = useState('easy');
  const [customPlaylist, setCustomPlaylist] = useState(null);
  const [importError, setImportError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [savedPlaylists, setSavedPlaylists] = useState(() => {
    // Load saved playlists from localStorage on initial render
    const saved = localStorage.getItem('wordweaver_custom_playlists');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved playlists:', e);
      }
    }
    return [];
  });
  
  const { playButtonClick, playButtonHover, playWrong } = useSounds();

  // Save playlist to localStorage
  const savePlaylist = useCallback((playlist) => {
    const updated = [...savedPlaylists, { ...playlist, id: Date.now(), createdAt: new Date().toISOString() }];
    setSavedPlaylists(updated);
    localStorage.setItem('wordweaver_custom_playlists', JSON.stringify(updated));
  }, [savedPlaylists]);

  // Handle custom JSON import
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportError('');
    setSuccessMessage('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.groups || !Array.isArray(data.groups) || data.groups.length < 1) {
          setImportError('JSON must have a "groups" array.');
          return;
        }
        for (const g of data.groups) {
          if (!g.category || !Array.isArray(g.words) || g.words.length !== 4) {
            setImportError('Each group needs "category" and exactly 4 "words".');
            return;
          }
        }
        const colors = ['#4ade80', '#60a5fa', '#f472b6', '#fb923c', '#a78bfa'];
        data.groups = data.groups.map((g, i) => ({
          color: colors[i % colors.length],
          ...g,
        }));
        const playlist = { ...data, title: data.title || file.name };
        setCustomPlaylist(playlist);
        setDifficulty('custom');
        setSuccessMessage(`✓ Loaded: ${playlist.title}`);
        // Auto-save imported playlist
        savePlaylist(playlist);
      } catch {
        setImportError('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleStart = () => {
    const playlist = difficulty === 'custom' && customPlaylist ? customPlaylist : PLAYLISTS[difficulty];
    onStart(playlist, difficulty);
  };

  const handlePlaylistCreated = (playlist) => {
    savePlaylist(playlist);
    setCustomPlaylist(playlist);
    setDifficulty('custom');
    setActiveTab('play');
    setSuccessMessage(`✓ Created: ${playlist.title}`);
  };

  const handleSelectSavedPlaylist = (playlist) => {
    setCustomPlaylist(playlist);
    setDifficulty('custom');
    setActiveTab('play');
    setSuccessMessage(`✓ Selected: ${playlist.title}`);
  };

  const handleDeleteSavedPlaylist = (id) => {
    const updated = savedPlaylists.filter(p => p.id !== id);
    setSavedPlaylists(updated);
    localStorage.setItem('wordweaver_custom_playlists', JSON.stringify(updated));
    if (customPlaylist?.id === id) {
      setCustomPlaylist(null);
    }
  };

  const handleDifficultyClick = (d) => {
    if (d.comingSoon) {
      playWrong();
      return;
    }
    playButtonClick();
    setDifficulty(d.id);
    if (!d.comingSoon) {
      setCustomPlaylist(null);
      setSuccessMessage('');
    }
  };

  // Render Play Tab
  const renderPlayTab = () => (
    <>
      {/* Difficulty grid */}
      <div className="section-block">
        <p className="section-label">Choose Difficulty</p>
        <div className="difficulty-grid">
          {DIFFICULTY_META.map((d) => (
            <button
              key={d.id}
              className={`diff-btn ${difficulty === d.id ? 'active' : ''} ${d.comingSoon ? 'coming-soon' : ''}`}
              style={{
                background: difficulty === d.id ? `${d.color}20` : undefined,
                borderColor: difficulty === d.id ? d.color : undefined,
                color: difficulty === d.id ? d.color : undefined,
                fontWeight: difficulty === d.id ? '700' : '400',
              }}
              onClick={() => handleDifficultyClick(d)}
              onMouseEnter={playButtonHover}
              disabled={d.comingSoon}
            >
              <span className="diff-label">{d.label}</span>
              <span className="diff-sub">{d.sub}</span>
              {d.comingSoon && (
                <span className="coming-soon-badge">Coming Soon!</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom playlist import */}
      <div className="section-block">
        <p className="section-label">Import Custom Playlist</p>
        <div className="import-row">
          <input
            type="file"
            accept=".json"
            className="file-input"
            onChange={(e) => { playButtonClick(); handleFileImport(e); }}
            onMouseEnter={playButtonHover}
          />
        </div>
        {importError && <p className="import-error">{importError}</p>}
        {successMessage && <p className="import-success">{successMessage}</p>}
        <p className="import-format">
          Import a .json file or create your own using the "Create Playlist" tab.
        </p>
      </div>

      {/* Start button with difficulty-based tremor */}
      <button 
        className={`start-btn start-btn--${difficulty}`}
        onClick={() => { playButtonClick(); handleStart(); }}
        onMouseEnter={playButtonHover}
        disabled={DIFFICULTY_META.find(d => d.id === difficulty)?.comingSoon}
      >
        {customPlaylist && difficulty === 'custom' 
          ? `Play "${customPlaylist.title}" →`
          : `Play ${DIFFICULTY_META.find(d => d.id === difficulty)?.label} →`
        }
      </button>
    </>
  );

  return (
    <div className="start-wrapper">
      {/* Settings Button */}
      <button 
        className="settings-btn"
        onClick={() => { playButtonClick(); setShowSettings(true); }}
        onMouseEnter={playButtonHover}
        aria-label="Settings"
      >
        ⚙️
      </button>

      {/* Logo */}
      <div className="logo-block">
        <h1 className="logo">
          Word<span className="logo-accent">Weaver</span>
        </h1>
        <p className="tagline">Find the hidden categories</p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => { playButtonClick(); setActiveTab('play'); }}
          onMouseEnter={playButtonHover}
        >
          Play
        </button>
        <button
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => { playButtonClick(); setActiveTab('create'); }}
          onMouseEnter={playButtonHover}
        >
          Create Playlist
        </button>
        <button
          className={`tab-btn ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => { playButtonClick(); setActiveTab('browse'); }}
          onMouseEnter={playButtonHover}
        >
          Browse ({savedPlaylists.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'play' && renderPlayTab()}
        {activeTab === 'create' && (
          <PlaylistEditor
            onSave={handlePlaylistCreated}
            onCancel={() => setActiveTab('play')}
          />
        )}
        {activeTab === 'browse' && (
          <PlaylistBrowser
            playlists={savedPlaylists}
            onSelect={handleSelectSavedPlaylist}
            onDelete={handleDeleteSavedPlaylist}
            onBack={() => setActiveTab('play')}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="start-footer">
        <p>© 2026 A Project by Ashen.IT</p>
      </footer>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
