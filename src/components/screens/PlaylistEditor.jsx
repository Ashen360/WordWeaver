import React, { useState } from 'react';
import { useSounds } from '../../utils/sounds.js';
import './PlaylistEditor.css';

const DEFAULT_COLORS = ['#4ade80', '#60a5fa', '#f472b6', '#fb923c', '#a78bfa', '#fbbf24', '#a3e635', '#22d3ee'];

/**
 * Playlist Editor - Create custom playlists with a user-friendly UI
 * Props:
 *  - onSave {function} - Called with the created playlist object
 *  - onCancel {function} - Called when user cancels
 *  - initialPlaylist {object} - Optional playlist to edit (for import/edit mode)
 */
export function PlaylistEditor({ onSave, onCancel, initialPlaylist = null }) {
  const [title, setTitle] = useState(initialPlaylist?.title || 'My Custom Playlist');
  const [groups, setGroups] = useState(
    initialPlaylist?.groups || [
      { category: '', words: ['', '', '', ''], color: DEFAULT_COLORS[0] }
    ]
  );
  const [errors, setErrors] = useState([]);
  const { playButtonClick, playButtonHover, playCorrect, playWrong } = useSounds();

  // Get colors used by other groups
  const getUsedColors = (currentIndex) => {
    return groups
      .filter((_, index) => index !== currentIndex)
      .map(g => g.color);
  };

  const addGroup = () => {
    if (groups.length >= 8) {
      playWrong();
      setErrors(['Maximum 8 groups allowed']);
      return;
    }
    playButtonClick();
    // Find first available unused color
    const usedColors = getUsedColors(-1);
    const availableColor = DEFAULT_COLORS.find(c => !usedColors.includes(c)) || DEFAULT_COLORS[0];
    setGroups([...groups, { category: '', words: ['', '', '', ''], color: availableColor }]);
    setErrors([]);
  };

  const removeGroup = (index) => {
    if (groups.length <= 1) {
      playWrong();
      setErrors(['At least one group is required']);
      return;
    }
    playButtonClick();
    const newGroups = groups.filter((_, i) => i !== index);
    setGroups(newGroups);
    setErrors([]);
  };

  const updateGroupCategory = (index, value) => {
    const newGroups = [...groups];
    newGroups[index].category = value;
    setGroups(newGroups);
  };

  const updateWord = (groupIndex, wordIndex, value) => {
    const newGroups = [...groups];
    newGroups[groupIndex].words[wordIndex] = value;
    setGroups(newGroups);
  };

  const updateColor = (index, color) => {
    // Check if color is already used by another group
    const usedColors = getUsedColors(index);
    if (usedColors.includes(color)) {
      playWrong();
      setErrors([`Color already used by another group. Each group must have a unique color.`]);
      return;
    }
    playButtonClick();
    const newGroups = [...groups];
    newGroups[index].color = color;
    setGroups(newGroups);
    setErrors([]);
  };

  const validate = () => {
    const newErrors = [];
    
    if (!title.trim()) {
      newErrors.push('Playlist title is required');
    }

    groups.forEach((group, index) => {
      if (!group.category.trim()) {
        newErrors.push(`Group ${index + 1}: Category name is required`);
      }
      
      const emptyWords = group.words.filter(w => !w.trim()).length;
      if (emptyWords > 0) {
        newErrors.push(`Group ${index + 1}: All 4 words are required`);
      }
      
      // Check for duplicate words within this group
      const trimmedWords = group.words.map(w => w.trim().toLowerCase());
      const duplicates = trimmedWords.filter((item, idx) => trimmedWords.indexOf(item) !== idx);
      if (duplicates.length > 0) {
        newErrors.push(`Group ${index + 1}: Duplicate words found`);
      }
    });

    // Check for duplicate categories
    const categories = groups.map(g => g.category.trim().toLowerCase());
    const dupCategories = categories.filter((item, idx) => categories.indexOf(item) !== idx);
    if (dupCategories.length > 0) {
      newErrors.push('Duplicate category names found');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      playWrong();
      return;
    }
    playCorrect();

    const playlist = {
      title: title.trim(),
      groups: groups.map(g => ({
        category: g.category.trim(),
        words: g.words.map(w => w.trim()),
        color: g.color
      }))
    };

    onSave(playlist);
  };

  const handleExport = () => {
    if (!validate()) {
      playWrong();
      return;
    }
    playCorrect();

    const playlist = {
      title: title.trim(),
      groups: groups.map(g => ({
        category: g.category.trim(),
        words: g.words.map(w => w.trim()),
        color: g.color
      }))
    };

    const blob = new Blob([JSON.stringify(playlist, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.trim().replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="playlist-editor">
      <div className="editor-header">
        <h2 className="editor-title">Create Custom Playlist</h2>
        <p className="editor-subtitle">Design your own word puzzle</p>
      </div>

      {/* Title Input */}
      <div className="editor-section">
        <label className="editor-label">Playlist Title</label>
        <input
          type="text"
          className="editor-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter playlist title..."
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((error, index) => (
            <p key={index} className="error-item">• {error}</p>
          ))}
        </div>
      )}

      {/* Groups */}
      <div className="groups-container">
        {groups.map((group, groupIndex) => {
          const usedColors = getUsedColors(groupIndex);
          return (
            <div 
              key={groupIndex} 
              className="group-card"
              style={{ borderLeftColor: group.color }}
            >
              <div className="group-header">
                <span className="group-number">Group {groupIndex + 1}</span>
                <div className="group-actions">
                  {/* Color Picker - Only show unused colors + current color */}
                  <div className="color-picker">
                    {DEFAULT_COLORS.map((color) => {
                      const isUsed = usedColors.includes(color);
                      const isSelected = group.color === color;
                      return (
                        <button
                          key={color}
                          className={`color-option ${isSelected ? 'selected' : ''} ${isUsed ? 'used' : ''}`}
                          style={{ 
                            backgroundColor: color,
                            opacity: isUsed ? 0.3 : 1,
                            cursor: isUsed ? 'not-allowed' : 'pointer'
                          }}
                          onClick={() => !isUsed && updateColor(groupIndex, color)}
                          onMouseEnter={() => !isUsed && playButtonHover()}
                          title={isUsed ? 'Color already used' : 'Select color'}
                          disabled={isUsed}
                        />
                      );
                    })}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeGroup(groupIndex)}
                    onMouseEnter={playButtonHover}
                    title="Remove this group"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Category Input */}
              <input
                type="text"
                className="category-input"
                value={group.category}
                onChange={(e) => updateGroupCategory(groupIndex, e.target.value)}
                placeholder="Category name (e.g., Fruits, Colors)..."
              />

              {/* Words Grid */}
              <div className="words-grid">
                {group.words.map((word, wordIndex) => (
                  <input
                    key={wordIndex}
                    type="text"
                    className="word-input"
                    value={word}
                    onChange={(e) => updateWord(groupIndex, wordIndex, e.target.value)}
                    placeholder={`Word ${wordIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Group Button */}
      <button className="add-group-btn" onClick={addGroup} onMouseEnter={playButtonHover}>
        + Add Group
      </button>

      {/* Action Buttons */}
      <div className="editor-actions">
        <button className="btn-secondary" onClick={() => { playButtonClick(); onCancel(); }} onMouseEnter={playButtonHover}>
          Cancel
        </button>
        <button className="btn-export" onClick={() => { playButtonClick(); handleExport(); }} onMouseEnter={playButtonHover}>
          Export JSON
        </button>
        <button className="btn-primary" onClick={handleSave} onMouseEnter={playButtonHover}>
          Play Playlist
        </button>
      </div>

      <p className="editor-help">
        💡 Tip: Each group needs a unique category name and exactly 4 related words.
      </p>
    </div>
  );
}
