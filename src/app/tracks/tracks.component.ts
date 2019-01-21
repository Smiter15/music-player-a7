import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Model
import { Album } from '../album/album.model';

// Services
import { ItunesService } from '../_services/http/itunes.service';
import { PlayerService } from '../_services/helpers/player.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  selectedAlbum: Album;
  routeParams;
  tracks: Array<any> = [];
  displayedColumns: string[] = ['Number', 'Name'];
  active: string;

  constructor(private ituneService: ItunesService,
              private route: ActivatedRoute,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.ituneService.getTracks(params.colllection_id).subscribe(tracks => {
        this.tracks = tracks;
        this.selectedAlbum = new Album(this.tracks.shift());
        console.log(this.selectedAlbum);
      });
    });
  }

  playTrack(track) {
    this.active = track.previewUrl;
    this.playerService.playTrack(track.previewUrl);
  }
}
