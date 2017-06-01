import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class CustomersService extends RestService {
  resource: string = '/customers';
}
