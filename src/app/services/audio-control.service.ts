import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  // Сигнал со списком всех зарегистрированных плееров
  private players = signal<HTMLAudioElement[]>([]);

  // Сигнал с набором плееров, которые играли ранее (чтобы потом их снова запустить)
  private previouslyPlayingPlayers = signal<Set<HTMLAudioElement>>(new Set());

  registerPlayer(player: HTMLAudioElement): void {
    console.log('Registering player:', player);
    this.players.update(players => {
      if (!players.includes(player)) {
        players.push(player);
        console.log(player)
      }
      return players; // Возвращаем обновлённый массив
    });
  }

  togglePlay(): void {
    const registeredPlayers = this.players();
    console.log('Registered players on toggle:', registeredPlayers);

    const currentlyPlaying = registeredPlayers.filter(p => !p.paused);
    const prevPlaying = this.previouslyPlayingPlayers();

    if (prevPlaying.size === 0) {
      // Нет ранее сохраненных плееров
      if (currentlyPlaying.length > 0) {
        this.previouslyPlayingPlayers.set(new Set(currentlyPlaying));
        currentlyPlaying.forEach(player => player.pause());
      } else {
        // Никто не играет - ничего не делаем или реализуем свою логику
      }
    } else {
      // Есть ранее сохраненные плееры - запускаем их
      prevPlaying.forEach(player => player.play());
      this.previouslyPlayingPlayers.set(new Set());
    }
  }
}
