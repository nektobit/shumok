import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {Sound} from '../../app.component';
import {AudioControlService} from '../../services/audio-control.service';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  standalone: true,
})
export class PlayerComponent {
  @Input() sound!: Sound;

  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  volume = 0.6;

  private handlePlay = () => {
    this.isPlaying = true;
  };

  private handlePause = () => {
    this.isPlaying = false;
  };

  ngAfterViewInit(): void {
    if (this.audioRef && this.audioRef.nativeElement) {
      const audio = this.audioRef.nativeElement;
      this.audioService.registerPlayer(audio);
      audio.volume = this.volume;
      audio.addEventListener('play', this.handlePlay);
      audio.addEventListener('pause', this.handlePause);
    }

  }

  ngOnDestroy(): void {
    if (this.audioRef && this.audioRef.nativeElement) {
      const audio = this.audioRef.nativeElement;
      audio.removeEventListener('play', this.handlePlay);
      audio.removeEventListener('pause', this.handlePause);
    }
  }

  togglePlay(): void {
    if (!this.audioRef || !this.audioRef.nativeElement) {
      return;
    }
    const audio = this.audioRef.nativeElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  onVolumeChange(event: Event): void {
    if (!this.audioRef || !this.audioRef.nativeElement) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    this.volume = value;
    this.audioRef.nativeElement.volume = value;
  }

  private audioService = inject(AudioControlService);
}
