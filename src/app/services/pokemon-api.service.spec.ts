import { TestBed } from '@angular/core/testing';

import { PokemonApiService } from './pokemon-api.service';

describe('PokemonApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonApiService = TestBed.get(PokemonApiService);
    expect(service).toBeTruthy();
  });
});
