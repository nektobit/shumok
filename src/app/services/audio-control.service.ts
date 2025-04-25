import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  // Список всех зарегистрированных <audio>
  private players           = signal<HTMLAudioElement[]>([]);
  // Те, что были активны при последней паузе
  private previouslyPlaying = signal<Set<HTMLAudioElement>>(new Set());
  // Флаг: играет ли хоть один плеер
  public  isAnyPlaying      = signal<boolean>(false);

  constructor() {}

  /** Регистрирует новый <audio> в сервисе */
  registerPlayer(player: HTMLAudioElement): void {
    this.players.update(list => {
      if (!list.includes(player)) {
        list.push(player);

        // Следим за ручным play/pause, чтобы держать isAnyPlaying в актуальном состоянии
        player.addEventListener('play',  () => this.updateAnyPlaying());
        player.addEventListener('pause', () => this.updateAnyPlaying());
      }
      return list;
    });
    // сразу обновляем флаг
    this.updateAnyPlaying();
  }

  /** Toggle-play: логика пауза ↔ резюме ↔ первый запуск */
  togglePlay(): void {
    const list    = this.players();
    const playing = list.filter(p => !p.paused);
    const saved   = this.previouslyPlaying();

    if (playing.length > 0) {
      // если что-то играет — запоминаем и ставим на паузу только их
      this.previouslyPlaying.set(new Set(playing));
      playing.forEach(p => p.pause());

    } else if (saved.size > 0) {
      // если ничего не играет, но есть сохранённый набор — возобновляем именно его
      saved.forEach(p => p.play());
      this.previouslyPlaying.set(new Set());

    } else {
      // первый запуск — запускаем все зарегистрированные
      list.forEach(p => p.play());
    }

    this.updateAnyPlaying();
  }

  /** Пересчитывает флаг isAnyPlaying */
  private updateAnyPlaying(): void {
    this.isAnyPlaying.set(this.players().some(p => !p.paused));
  }
}
