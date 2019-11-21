// tslint:disable: align
// tslint:disable: no-unused-expression

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCollapsibleComponent } from './ng-collapsible.component';
import { Component } from '@angular/core';
import { NgCollapsibleDefaultOptions } from './ng-collapsible.model';

@Component({
  template: `
    <div ngCollapsible>
      <h2>title</h2>
      <div><item 1</div>
      <div><item 2</div>
    </div>
  `
})
class TestComponent { }

describe('NgCollapsibleComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let componentNgCollapsible: NgCollapsibleComponent;
  let fixtureNgCollapsible: ComponentFixture<NgCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgCollapsibleComponent, TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixtureNgCollapsible = TestBed.createComponent(NgCollapsibleComponent);
    componentNgCollapsible = fixtureNgCollapsible.componentInstance;
    fixtureNgCollapsible.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have headerBox element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headerBox = el.getElementsByClassName('ngCollapseHeaderBox');
    expect(headerBox).toBeTruthy();
  });

  it('should have header element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const header = el.getElementsByClassName('ngCollapseHeader');
    expect(header).toBeTruthy();
  });

  it('should have close icon element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const icon = el.getElementsByClassName('ngCollapseCloseIcon');
    expect(icon).toBeTruthy();
  });

  it('should have open icon element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const icon = el.getElementsByClassName('ngCollapseOpenIcon');
    expect(icon).toBeTruthy();
  });

  it('should have items element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const items = el.getElementsByClassName('ngCollapseItems');
    expect(items).toBeTruthy();
  });

  it('should hide items when close element', () => {
    const el: HTMLElement = fixture.nativeElement;
    const items: HTMLElement = el.getElementsByClassName('ngCollapseItems').item(0) as HTMLElement;
    const displayStyle = items.style.display;
    expect(displayStyle).toEqual('none');
  });

});

