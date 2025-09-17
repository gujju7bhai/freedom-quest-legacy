// Sound utility using Web Audio API for correct/incorrect feedback

let audioContext: AudioContext | null = null;

const ensureAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
};

const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
  const ctx = ensureAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

const playChord = (frequencies: number[], duration: number, volume: number = 0.2) => {
  frequencies.forEach(freq => {
    playTone(freq, duration, 'sine', volume);
  });
};

export const playCorrectSound = () => {
  // Pleasant ascending chord progression
  const ctx = ensureAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // C major chord arpeggio
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, index) => {
    setTimeout(() => {
      playTone(freq, 0.4, 'sine', 0.25);
    }, index * 80);
  });
};

export const playIncorrectSound = () => {
  // Descending minor chord with buzz
  const ctx = ensureAudioContext();
  if (!ctx) return;

  // Play a descending sweep + noise burst
  playTone(400, 0.3, 'sawtooth', 0.3);
  
  setTimeout(() => {
    playTone(300, 0.3, 'sawtooth', 0.25);
  }, 100);
  
  setTimeout(() => {
    playTone(200, 0.4, 'sawtooth', 0.2);
  }, 200);
};

export const playXPGainSound = () => {
  // Quick positive chime
  playTone(800, 0.2, 'sine', 0.2);
  setTimeout(() => {
    playTone(1000, 0.2, 'sine', 0.15);
  }, 100);
};

// Initialize audio context on first user interaction
export const initializeAudio = () => {
  ensureAudioContext();
};