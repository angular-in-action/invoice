import { TestBed, inject } from '@angular/core/testing';

import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicesService]
    });
  });

  it('should be created', inject([InvoicesService], (service: InvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
