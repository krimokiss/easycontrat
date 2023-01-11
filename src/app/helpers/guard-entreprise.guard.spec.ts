import { TestBed } from '@angular/core/testing';

import { GuardEntrepriseGuard } from './guard-entreprise.guard';

describe('GuardEntrepriseGuard', () => {
  let guard: GuardEntrepriseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardEntrepriseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
