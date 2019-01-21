import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ItunesService } from './itunes.service';

describe('ItunesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ItunesService = TestBed.get(ItunesService);
    expect(service).toBeTruthy();
  });
});
