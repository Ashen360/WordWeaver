/**
 * Playlist Exports
 * Re-exports all difficulty playlists from separate files
 */

import { EASY_PLAYLIST } from './easy.js';
import { MEDIUM_PLAYLIST } from './medium.js';
import { HARD_PLAYLIST } from './hard.js';

export { EASY_PLAYLIST } from './easy.js';
export { MEDIUM_PLAYLIST } from './medium.js';
export { HARD_PLAYLIST } from './hard.js';

/** Playlist metadata for UI - with daily as coming soon */
export const DIFFICULTY_META = [
  { id: "easy", label: "Easy", sub: "Familiar categories", color: "#4ade80", tremor: "0px" },
  { id: "medium", label: "Medium", sub: "Think harder", color: "#60a5fa", tremor: "1px" },
  { id: "hard", label: "Hard", sub: "Expert knowledge", color: "#f472b6", tremor: "2px" },
  { id: "daily", label: "Daily", sub: "Coming Soon!", color: "#fb923c", tremor: "0px", comingSoon: true },
];

/** Map difficulty names to their playlists */
export const PLAYLISTS = {
  easy: EASY_PLAYLIST,
  medium: MEDIUM_PLAYLIST,
  hard: HARD_PLAYLIST,
};
