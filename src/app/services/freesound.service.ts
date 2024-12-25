import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreeSoundService {

  constructor() { }

  getFreeSoundUrls(urls: string[]) {
    const soundIds = [143701, 438548, 634927];
    const apiKey = 'yHTrAih8cqvZ2FQbN4sntvEOiNSPOQaasTICzY94';

// Создаем строку фильтрации
    const filter = `id:(${soundIds.join(' OR ')})`;

    fetch(`https://freesound.org/apiv2/search/text/?filter=${filter}&fields=id,previews`, {
      headers: { Authorization: `Token ${apiKey}` },
    })
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((sound: any) => {
          console.log(sound)
          console.log(`ID: ${sound.id}`);
          console.log(`HQ MP3: ${sound.previews['preview-hq-mp3']}`);
        });
      })
      .catch((error) => console.error('Error fetching sounds:', error));
  }
}
