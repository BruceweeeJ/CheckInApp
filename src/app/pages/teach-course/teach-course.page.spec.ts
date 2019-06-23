import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachCoursePage } from './teach-course.page';

describe('TeachCoursePage', () => {
  let component: TeachCoursePage;
  let fixture: ComponentFixture<TeachCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachCoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
