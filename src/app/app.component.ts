import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {PlayerComponent} from './components/player/player.component';
import {AudioControlService} from './services/audio-control.service';
import {SOUNDS} from './store/sounds.const';
import {NgIf} from '@angular/common';

export type Sound = { id: string, title: string, icon: string, file: { url: string, type: string } };
export type Sounds = Sound[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    PlayerComponent
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  audioService = inject(AudioControlService);

  togglePlay(): void {
    this.audioService.togglePlay();
  }

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const volume = parseFloat(input.value);
    this.audioService.setVolume(volume);
  }

  protected readonly SOUNDS = SOUNDS;
}
