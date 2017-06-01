import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class InvoicesService extends RestService {
  resource: string = '/invoices';
}
