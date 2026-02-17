import React from 'react';
import { useSounds } from '../../utils/sounds.js';
import './PlaylistBrowser.css';

/**
 * Playlist Browser - View and manage saved custom playlists
 * Props:
 *  - playlists {Array} - List of saved playlists
 *  - onSelect {function} - Called when a playlist is selected
 *  - onDelete {function} - Called when a playlist is deleted
 *  - onBack {function} - Called to go back
 */
export function PlaylistBrowser({ playlists, onSelect, onDelete, onBack }) {
  const { playButtonClick, playButtonHover, playWrong } = useSounds();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    playWrong();
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      onDelete(id);
    }
  };

  return (
    <div className="playlist-browser">
      <div className="browser-header">
        <h2 className="browser-title">Browse Playlists</h2>
        <p className="browser-subtitle">Your saved custom playlists</p>
      </div>

      {playlists.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">No saved playlists yet</p>
          <p className="empty-hint">Create or import a playlist to see it here!</p>
        </div>
      ) : (
        <div className="playlists-list">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => { playButtonClick(); onSelect(playlist); }}
              onMouseEnter={playButtonHover}
            >
              <div className="playlist-info">
                <h3 className="playlist-name">{playlist.title}</h3>
                <p className="playlist-meta">
                  {playlist.groups.length} groups • {playlist.groups.reduce((acc, g) => acc + g.words.length, 0)} words
                </p>
                <p className="playlist-date">
                  Created {new Date(playlist.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, playlist.id)}
                onMouseEnter={playButtonHover}
                title="Delete playlist"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      <button 
        className="back-btn" 
        onClick={() => { playButtonClick(); onBack(); }}
        onMouseEnter={playButtonHover}
      >
        ← Back to Menu
      </button>
    </div>
  );
}
