import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  // Сигнал со списком всех зарегистрированных плееров
  private players = signal<HTMLAudioElement[]>([]);

  // Сигнал с набором плееров, которые играли ранее
  private previouslyPlayingPlayers = signal<Set<HTMLAudioElement>>(new Set());

  // Сигнал для управления громкостью
  private volume = signal<number>(1);

  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    // Подписываемся на изменение громкости, если gainNode уже инициализирован
    effect(() => {
      const currentVolume = this.volume();
      const initialized = this.isInitialized();
      if (this.gainNode && initialized) {
        this.gainNode.gain.value = currentVolume;
      }
    });

    // Ставим обработчик на кнопку "play" (она должна существовать в DOM)
    // const playButton = document.getElementById('play');
    // if (playButton) {
    //
    //   playButton.addEventListener('click', () => {
    //
    //     this.initializeAudioContext();
    //   });
    // } else {
    //   console.warn('No #play button found in the DOM.');
    // }
  }

  public isInitialized = signal<boolean>(false);

  public initializeAudioContext(): void {
    if (!this.audioContext) {
        this.audioContext = new AudioContext();

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = this.volume();

        this.gainNode.connect(this.audioContext.destination);

        this.isInitialized.set(true);
    }
  }

  registerPlayer(player: HTMLAudioElement): void {
    if (!this.audioContext || !this.gainNode) {
      console.warn('AudioContext is not initialized yet. Ensure user clicked the play button.');
      return;
    }

    this.players.update((players) => {
      if (!players.includes(player)) {
        const track = this.audioContext!.createMediaElementSource(player);
        track.connect(this.gainNode!);
        players.push(player);
      }
      return players;
    });
  }

  togglePlay(): void {
    const registeredPlayers = this.players();
    console.log('Registered players on toggle:', registeredPlayers);

    const currentlyPlaying = registeredPlayers.filter((p) => !p.paused);
    const prevPlaying = this.previouslyPlayingPlayers();

    if (prevPlaying.size === 0) {
      if (currentlyPlaying.length > 0) {
        this.previouslyPlayingPlayers.set(new Set(currentlyPlaying));
        currentlyPlaying.forEach((player) => player.pause());
      }
    } else {
      prevPlaying.forEach((player) => player.play());
      this.previouslyPlayingPlayers.set(new Set());
    }
  }

  setVolume(value: number): void {
    const clampedValue = Math.min(1, Math.max(0, value));
    this.volume.set(clampedValue);
  }

  getVolume(): number {
    return this.volume();
  }
}
