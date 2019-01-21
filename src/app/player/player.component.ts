import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { PlayerService } from '../_services/helpers/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('player')
  playerRef;
  player: any;

  constructor(private playerService: PlayerService) {
    playerService.playTrack$.subscribe(previewAudio => {
      this.playTrack(previewAudio);
    });
  }

  ngOnInit() {
    this.player = this.playerRef.nativeElement;
  }

  playTrack(previewAudio) {
    this.player.src = previewAudio;
    this.player.play();
  }
}
