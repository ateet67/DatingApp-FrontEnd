import { TestBed } from '@angular/core/testing';

import { ToasterServicesService } from './toaster-services.service';

describe('ToasterServicesService', () => {
  let service: ToasterServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
