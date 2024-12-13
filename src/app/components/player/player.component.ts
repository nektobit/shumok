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

  constructor() {}

  ngAfterViewInit(): void {
    if (this.audioRef && this.audioRef.nativeElement) {
      this.audioService.registerPlayer(this.audioRef.nativeElement);
      //console.log(this.audioRef.nativeElement)
    }

  }

  private audioService = inject(AudioControlService);
}
