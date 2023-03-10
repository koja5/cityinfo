import { TestBed } from '@angular/core/testing';

import { LoggedGuardUserService } from './logged-guard-user.service';

describe('LoggedGuardUserService', () => {
  let service: LoggedGuardUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedGuardUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
