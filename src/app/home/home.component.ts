import { Component, OnInit } from '@angular/core';

// Services
import { PlayerService } from '../_services/helpers/player.service';
import { LocalStorageService } from '../_services/helpers/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public top: string;
  public left: string;
  public showPlay = false;

  constructor(private playerService: PlayerService,
              private localStorage: LocalStorageService) { }

  ngOnInit() {
    if (!this.localStorage.get('playTheShark')) {
      document.getElementById('play').click();
      this.localStorage.set('playTheShark', true);
    } else {
      this.showPlay = true;
    }
  }

  playTheShark() {
    this.playerService.playTrack('../../assets/babyshark.mp3');
    this.showPlay = false;
  }

  stopTheShark() {
    this.playerService.playTrack('');
    this.showPlay = true;
  }

  moveStopButton() {
    this.top = (Math.random() * 200) + 'px';
    this.left = (Math.random() * 200) + 'px';
  }
}
