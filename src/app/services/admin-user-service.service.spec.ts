import { TestBed } from '@angular/core/testing';

import { AdminUserServiceService } from './admin-user-service.service';

describe('AdminUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserServiceService = TestBed.get(AdminUserServiceService);
    expect(service).toBeTruthy();
  });
});
