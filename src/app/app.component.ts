import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {PlayerComponent} from './components/player/player.component';
import {AudioControlService} from './services/audio-control.service';

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

  sounds: Sounds = [
    {
      id: 'rain',
      title: 'Дождь',
      icon: 'Rain',
      file: {
        url: 'sounds/rain.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'storm',
      title: 'Шторм',
      icon: 'Storm',
      file: {
        url: 'sounds/storm.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'drops',
      title: 'Капли',
      icon: 'Drops',
      file: {
        url: 'sounds/drops.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'wind',
      title: 'Ветер',
      icon: 'Wind',
      file: {
        url: 'sounds/wind.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'waves',
      title: 'Волны',
      icon: 'Waves',
      file: {
        url: 'sounds/waves.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'underwater',
      title: 'Под водой',
      icon: 'Underwater',
      file: {
        url: 'sounds/underwater.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'stream-water',
      title: 'Течение',
      icon: 'StreamWater',
      file: {
        url: 'sounds/stream-water.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'waterfall',
      title: 'Водопад',
      icon: 'Waterfall',
      file: {
        url: 'sounds/waterfall.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'birds-tree',
      title: 'Птицы',
      icon: 'BirdsTree',
      file: {
        url: 'sounds/birds-tree.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'leaves',
      title: 'Листья',
      icon: 'Leaves',
      file: {
        url: 'sounds/leaves.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'fire',
      title: 'Огонь',
      icon: 'Fire',
      file: {
        url: 'sounds/fire.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'cave',
      title: 'Пещера',
      icon: 'Cave',
      file: {
        url: 'sounds/cave-drops.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'night',
      title: 'Ночь',
      icon: 'Night',
      file: {
        url: 'sounds/night.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'coffee',
      title: 'Кафе',
      icon: 'Coffee',
      file: {
        url: 'sounds/coffee.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'train',
      title: 'Поезд',
      icon: 'Train',
      file: {
        url: 'sounds/train.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'air-plane',
      title: 'Самолет',
      icon: 'AirPlane',
      file: {
        url: 'sounds/air-plane.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'washing-machine',
      title: 'Стиральная машина',
      icon: 'WashingMachine',
      file: {
        url: 'sounds/washing-machine.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'playground',
      title: 'Детская площадка',
      icon: 'Playground',
      file: {
        url: 'sounds/playground.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'boat',
      title: 'Лодка',
      icon: 'Boat',
      file: {
        url: 'sounds/boat.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'rain-on-tent',
      title: 'Дождь в палатке',
      icon: 'RainOnTent',
      file: {
        url: 'sounds/rain-on-tent.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'brown-noise',
      title: 'Коричневый шум',
      icon: 'BrownNoise',
      file: {
        url: 'sounds/brown-noise.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'white-noise',
      title: 'Белый шум',
      icon: 'WhiteNoise',
      file: {
        url: 'sounds/white-noise.ogv',
        type: 'audio/ogv'
      }
    },
    {
      id: 'pink-noise',
      title: 'Розовый шум',
      icon: 'PinkNoise',
      file: {
        url: 'sounds/pink-noise.ogv',
        type: 'audio/ogv'
      }
    }
  ]

  private audioService = inject(AudioControlService);

  togglePlay(): void {
    this.audioService.togglePlay();
  }
}
