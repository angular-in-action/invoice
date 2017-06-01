import { Component } from '@angular/core';
import { InvoicesService, CustomersService } from '@aia/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    CustomersService,
    InvoicesService
  ]
})
export class AppComponent { }
