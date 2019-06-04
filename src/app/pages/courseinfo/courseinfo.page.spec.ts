import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseinfoPage } from './courseinfo.page';

describe('CourseinfoPage', () => {
  let component: CourseinfoPage;
  let fixture: ComponentFixture<CourseinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
