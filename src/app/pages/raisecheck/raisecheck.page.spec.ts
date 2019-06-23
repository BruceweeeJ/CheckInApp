import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisecheckPage } from './raisecheck.page';

describe('RaisecheckPage', () => {
  let component: RaisecheckPage;
  let fixture: ComponentFixture<RaisecheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisecheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisecheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
