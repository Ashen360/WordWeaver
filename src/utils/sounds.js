/**
 * Sound Effects Utility - Pop Style
 * Uses Web Audio API to generate satisfying pop sounds
 */

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.3; // 30% volume by default
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Play a pop sound with customizable parameters
  playPop(frequency, duration = 0.08, volume = null) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Use sine wave for a clean pop sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Quick attack and decay for pop effect
    const vol = volume !== null ? volume : this.volume;
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(vol, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play a quick double pop
  playDoublePop(freq1, freq2, delay = 40) {
    this.playPop(freq1, 0.06);
    setTimeout(() => this.playPop(freq2, 0.05), delay);
  }

  // Button click - crisp pop
  playButtonClick() {
    this.init();
    this.playDoublePop(800, 1000, 30);
  }

  // Button hover - tiny micro pop
  playButtonHover() {
    this.init();
    this.playPop(600, 0.03, this.volume * 0.5);
  }

  // Word selection - bright pop
  playWordSelect() {
    this.init();
    this.playDoublePop(700, 900, 25);
  }

  // Word deselection - lower dull pop
  playWordDeselect() {
    this.init();
    this.playDoublePop(500, 400, 25);
  }

  // Correct guess - cheerful pop sequence
  playCorrect() {
    this.init();
    this.playPop(600, 0.06);
    setTimeout(() => this.playPop(800, 0.06), 60);
    setTimeout(() => this.playPop(1000, 0.08), 120);
    setTimeout(() => this.playPop(1200, 0.1), 180);
  }

  // Wrong guess - dull thud
  playWrong() {
    this.init();
    // Low frequency thud using triangle wave for more body
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
    
    // Add a second thud for emphasis
    setTimeout(() => {
      const osc2 = this.audioContext.createOscillator();
      const gain2 = this.audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(this.audioContext.destination);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(120, this.audioContext.currentTime);
      gain2.gain.setValueAtTime(this.volume * 0.7, this.audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12);
      osc2.start(this.audioContext.currentTime);
      osc2.stop(this.audioContext.currentTime + 0.12);
    }, 50);
  }

  // Game won - ascending victory pops
  playWin() {
    this.init();
    const notes = [523, 659, 784, 1047, 1319, 1568];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playPop(freq, 0.08);
      }, index * 80);
    });
  }

  // Game lost - descending sad pops
  playLose() {
    this.init();
    const notes = [523, 494, 466, 440, 415, 392];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playPop(freq, 0.1);
      }, index * 100);
    });
  }

  // Shuffle - simple card shuffling sound (quick flutter of pops)
  playShuffle() {
    this.init();
    // Simulate card shuffling with rapid low pops
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.playPop(200 + Math.random() * 100, 0.04, this.volume * 0.6);
      }, i * 40);
    }
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Set volume (0-1)
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Hook for using sounds in components
export function useSounds() {
  return {
    playButtonClick: () => soundManager.playButtonClick(),
    playButtonHover: () => soundManager.playButtonHover(),
    playWordSelect: () => soundManager.playWordSelect(),
    playWordDeselect: () => soundManager.playWordDeselect(),
    playCorrect: () => soundManager.playCorrect(),
    playWrong: () => soundManager.playWrong(),
    playWin: () => soundManager.playWin(),
    playLose: () => soundManager.playLose(),
    playShuffle: () => soundManager.playShuffle(),
    toggleSound: () => soundManager.toggle(),
    setVolume: (v) => soundManager.setVolume(v),
    isEnabled: () => soundManager.enabled,
  };
}
