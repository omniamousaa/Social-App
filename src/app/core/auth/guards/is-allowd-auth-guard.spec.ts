import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAllowdAuthGuard } from './is-allowd-auth-guard';

describe('isAllowdAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAllowdAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
