import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { ItunesService } from '../_services/http/itunes.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  albumArray: Array<any> = [];
  artistName: string;
  artistId: string;

  constructor(private ituneService: ItunesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.artistId = param.id;
      this.artistName = param.name;
      this.getAlbum(param.id);
    });
  }

  getAlbum(artistId: number) {
    this.ituneService.getAlbum(artistId).subscribe((results: Array<any>) => {
      this.albumArray = results.map(albums => {
        albums.artworkUrl100 = this.makeImageBigger(albums.artworkUrl100);
        return albums;
      });
    });
  }

  onGetTracks(album) {
    this.ituneService.tracksSubject.next(album);
    this.router.navigate([this.artistId, this.artistName, album.collectionId, album.collectionName]);
  }

  private makeImageBigger(url: string) {
    const urlArray = url.split('/');
    urlArray[urlArray.length - 1] = '300x300bb.jpg';
    return urlArray.join('/');
  }
}
