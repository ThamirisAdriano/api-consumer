import { TestBed } from '@angular/core/testing';

import { SeriesService } from './serie.service';

describe('CarService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
