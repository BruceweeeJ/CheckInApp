import { TestBed } from '@angular/core/testing';

import { AuthenticationCodeServiceService } from './authentication-code-service.service';

describe('AuthenticationCodeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationCodeServiceService = TestBed.get(AuthenticationCodeServiceService);
    expect(service).toBeTruthy();
  });
});
