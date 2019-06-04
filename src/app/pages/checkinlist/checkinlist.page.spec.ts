import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinlistPage } from './checkinlist.page';

describe('CheckinlistPage', () => {
  let component: CheckinlistPage;
  let fixture: ComponentFixture<CheckinlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
