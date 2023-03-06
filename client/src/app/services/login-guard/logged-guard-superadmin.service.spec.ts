import { TestBed } from '@angular/core/testing';

import { LoggedGuardSuperadminService } from './logged-guard-superadmin.service';

describe('LoggedGuardSuperadminService', () => {
  let service: LoggedGuardSuperadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedGuardSuperadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
