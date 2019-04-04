import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitPage } from './wait.page';

describe('WaitPage', () => {
  let component: WaitPage;
  let fixture: ComponentFixture<WaitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
