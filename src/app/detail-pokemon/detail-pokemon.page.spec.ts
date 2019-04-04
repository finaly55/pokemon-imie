import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPokemonPage } from './detail-pokemon.page';

describe('DetailPokemonPage', () => {
  let component: DetailPokemonPage;
  let fixture: ComponentFixture<DetailPokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPokemonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
