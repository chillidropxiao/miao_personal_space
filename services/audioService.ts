
export class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isPlaying = false;
  private bgLoopId: any = null;

  constructor() {}

  public async toggle() {
    if (!this.isInitialized) {
      await this.init();
      this.isPlaying = true;
      return true;
    }

    if (this.ctx) {
      if (this.isPlaying) {
        // Fade out and suspend
        this.masterGain?.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        setTimeout(() => this.ctx?.suspend(), 500);
        this.isPlaying = false;
      } else {
        // Resume and fade in
        await this.ctx.resume();
        this.masterGain?.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1);
        this.isPlaying = true;
      }
    }
    return this.isPlaying;
  }

  public async init() {
    if (this.isInitialized) return;

    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 2);
      
      this.startHealingPiano();
      this.startEtherealDrone();
      
      this.isInitialized = true;
      this.isPlaying = true;
      console.log("Miao's Ghibli-Cyber Engine: Initialized");
    } catch (e) {
      console.error("Audio Init Failed:", e);
    }
  }

  private startEtherealDrone() {
    if (!this.ctx || !this.masterGain) return;
    
    const createPad = (freq: number, gainVal: number) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, this.ctx!.currentTime);

      g.gain.setValueAtTime(0, this.ctx!.currentTime);
      g.gain.linearRampToValueAtTime(gainVal, this.ctx!.currentTime + 5);

      osc.connect(filter);
      filter.connect(g);
      g.connect(this.masterGain!);
      osc.start();
    };

    createPad(65.41, 0.08); // C2
    createPad(98.00, 0.04); // G2
  }

  private startHealingPiano() {
    if (!this.ctx || !this.masterGain) return;

    const progression = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [349.23, 440.00, 523.25, 659.25, 698.46], // Fmaj7
      [392.00, 440.00, 523.25, 587.33, 783.99], // G11
      [440.00, 523.25, 659.25, 783.99, 880.00]  // Am7
    ];
    let chordIdx = 0;

    const playStep = () => {
      if (!this.ctx) return;
      if (this.ctx.state === 'running' && this.isPlaying) {
        const currentChord = progression[chordIdx];
        const notes = [...currentChord].sort(() => 0.5 - Math.random()).slice(0, 4);
        
        notes.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();
          const delay = i * (0.3 + Math.random() * 0.2);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + delay);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, this.ctx!.currentTime + delay);

          g.gain.setValueAtTime(0, this.ctx!.currentTime + delay);
          g.gain.linearRampToValueAtTime(0.06, this.ctx!.currentTime + delay + 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + delay + 8.0);
          
          osc.connect(filter);
          filter.connect(g);
          g.connect(this.masterGain!);
          osc.start(this.ctx!.currentTime + delay);
          osc.stop(this.ctx!.currentTime + delay + 8.0);
        });
        chordIdx = (chordIdx + 1) % progression.length;
      }
      this.bgLoopId = setTimeout(playStep, 7000 + Math.random() * 3000);
    };

    playStep();
  }

  public playNoteSound() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running' || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const freq = 880 + Math.random() * 1200; 
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.type = 'sine';
    g.gain.setValueAtTime(0.04, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.0);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 3.0);
  }

  public playShortMelody() {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running' || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const phrase = [659.25, 783.99, 880.00, 1046.50];
    phrase.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      const startTime = now + i * 0.18;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      g.gain.setValueAtTime(0, startTime);
      g.gain.linearRampToValueAtTime(0.05, startTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
      osc.connect(g);
      g.connect(this.masterGain!);
      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
  }
}

export const audioService = new AudioService();
