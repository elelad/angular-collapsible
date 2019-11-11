import { TestBed } from '@angular/core/testing';

import { NgCollapsibleService } from './ng-collapsible.service';

describe('NgCollapsibleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCollapsibleService = TestBed.get(NgCollapsibleService);
    expect(service).toBeTruthy();
  });
});
