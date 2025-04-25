// src/app/services/pallet.service.ts
import { Injectable, signal, Signal } from '@angular/core';
import { Sound } from '../app.component';
import { SOUNDS } from '../store/sounds.const';

@Injectable({
  providedIn: 'root'
})
export class PalletService {
  private readonly storageKey = 'soundList';
  /** Основной сигнал — при изменении здесь автоматически обновляется UI */
  readonly soundSignal = signal<Sound[]>(this.loadSounds());

  private loadSounds(): Sound[] {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      try {
        return JSON.parse(data) as Sound[];
      } catch (e) {
        console.error('Не удалось считать список звуков из localStorage', e);
      }
    }
    // fallback на дефолтный константный список
    return SOUNDS;
  }

  private saveSounds(sounds: Sound[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(sounds));
  }

  /** Устанавливает новый список звуков и сохраняет его в localStorage */
  setSounds(sounds: Sound[]): void {
    this.soundSignal.set(sounds);
    this.saveSounds(sounds);
  }

  /** Подготовить JSON-файл и вернуть URL для скачивания */
  exportSounds(): string {
    const json = JSON.stringify(this.soundSignal(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  /** Подгрузить JSON-список по ссылке и сразу записать его в signal/localStorage */
  async importSoundsFromUrl(url: string): Promise<void> {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} — ${resp.statusText}`);
    }
    const list = await resp.json() as Sound[];
    this.setSounds(list);
  }
}

