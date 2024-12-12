import {Component, Input} from '@angular/core';
import {Sound} from '../../app.component';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  standalone: true
})
export class PlayerComponent {
  @Input() sound!: Sound;
}
