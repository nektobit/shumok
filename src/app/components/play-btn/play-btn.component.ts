import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-play-btn',
  imports: [],
  templateUrl: './play-btn.component.html',
  standalone: true,
  styleUrl: './play-btn.component.scss'
})
export class PlayBtnComponent {
  @Input() isPlaying!: boolean;
}
