import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// Rxjs
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { debounceTime} from 'rxjs/operators';

// Services
import { ItunesService } from './_services/http/itunes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('searchBox') searchInput: ElementRef;

  hideResult: boolean;
  loading: boolean;
  searchResults: Array<any> = [];

  constructor(private ituneService: ItunesService) { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      tap(() => {
        this.loading = true;
      }),
      debounceTime(400)
    )
    .subscribe(() => {
      this.search(this.searchInput.nativeElement.value);
      this.loading = false;
    });
  }

  onResultClick() {
    this.hideResult = true;
    this.searchInput.nativeElement.value = '';
  }

  search(param) {
    this.ituneService.search(param).subscribe(data => {
      this.hideResult = false;
      this.searchResults = data['results'];
    }, err => console.log(err));
  }
}
