import { TestBed, async, inject } from '@angular/core/testing';

import { BugGuard } from './bug.guard';

describe('BugGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BugGuard]
    });
  });

  it('should ...', inject([BugGuard], (guard: BugGuard) => {
    expect(guard).toBeTruthy();
  }));
});
