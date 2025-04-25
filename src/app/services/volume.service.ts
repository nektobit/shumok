// src/app/services/volume.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  /** Сигнал с текущим значением глобальной громкости (0…1) */
  public volume = signal<number>(1);

  /** Установить значение 0–1 */
  setVolume(value: number): void {
    const v = Math.min(1, Math.max(0, value));
    this.volume.set(v);
  }

  /** Получить текущее значение */
  getVolume(): number {
    return this.volume();
  }
}
