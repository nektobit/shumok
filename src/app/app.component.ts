import {Component, inject, OnInit} from '@angular/core';
import {PlayerComponent} from './components/player/player.component';
import {AudioControlService} from './services/audio-control.service';
import {SOUNDS} from './store/sounds.const';
import {JsonPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EditPalletModalComponent} from './components/edit-pallete-modal/edit-pallet-modal.component';
import {PalletService} from './services/pallet.service';

export type Sound = { id: string, title: string, icon: string, file: { url: string, type: string } };
export type Sounds = Sound[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    PlayerComponent,
    JsonPipe,
    EditPalletModalComponent,
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public audioService = inject(AudioControlService);
  private activatedRoute = inject(ActivatedRoute);
  private routeSubscription!: Subscription;

  togglePlay(): void {
    this.audioService.togglePlay();
  }

  ngOnInit() {

  }

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const volume = parseFloat(input.value);
    if (!isNaN(volume)) {
      this.audioService.setVolume(volume);
    } else {
      console.error('Invalid volume value:', input.value);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  protected readonly SOUNDS = inject(PalletService).soundSignal;
}
