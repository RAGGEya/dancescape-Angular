import { TestBed } from '@angular/core/testing';

import { DanceCategoryService } from './dance-category.service';

describe('DanceCategoryService', () => {
  let service: DanceCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanceCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
