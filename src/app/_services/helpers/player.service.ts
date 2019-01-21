import { Injectable } from '@angular/core';

// Rxjs
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  private playTrackSource = new Subject<string>();

  playTrack$ = this.playTrackSource.asObservable();

  playTrack(previewAudio: string) {
    this.playTrackSource.next(previewAudio);
  }
}
