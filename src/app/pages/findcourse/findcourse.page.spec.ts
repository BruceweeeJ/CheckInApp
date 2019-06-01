import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindcoursePage } from './findcourse.page';

describe('FindcoursePage', () => {
  let component: FindcoursePage;
  let fixture: ComponentFixture<FindcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindcoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
