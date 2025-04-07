import {Injectable, signal} from '@angular/core';
import {SOUNDS} from '../store/sounds.const';

@Injectable({
  providedIn: 'root'
})
export class PalletService {
  soundSignal = signal(SOUNDS);

  constructor() { }
}
