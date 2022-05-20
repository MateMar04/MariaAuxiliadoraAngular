import { TestBed } from '@angular/core/testing';

import { PuntajesService } from './puntajes.service';

describe('PuntajesService', () => {
  let service: PuntajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
