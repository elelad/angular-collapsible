import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCollapsibleComponent } from './ng-collapsible.component';

describe('NgCollapsibleDirective', () => {
  let component: NgCollapsibleComponent;
  let fixture: ComponentFixture<NgCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCollapsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
