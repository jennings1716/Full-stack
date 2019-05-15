import { TestBed, inject } from '@angular/core/testing';

import { SignupservService } from './signupserv.service';

describe('SignupservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupservService]
    });
  });

  it('should be created', inject([SignupservService], (service: SignupservService) => {
    expect(service).toBeTruthy();
  }));
});
