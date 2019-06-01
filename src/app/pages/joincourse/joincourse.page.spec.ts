import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoincoursePage } from './joincourse.page';

describe('JoincoursePage', () => {
  let component: JoincoursePage;
  let fixture: ComponentFixture<JoincoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoincoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoincoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
