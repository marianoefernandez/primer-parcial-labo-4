import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenticadorGuardGuard } from './autenticador-guard.guard';

describe('autenticadorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenticadorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
