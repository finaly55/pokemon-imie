import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatPage } from './combat.page';

describe('CombatPage', () => {
  let component: CombatPage;
  let fixture: ComponentFixture<CombatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
