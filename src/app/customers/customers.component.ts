import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { CustomersService, Customer } from '@aia/services';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private loadingService: TdLoadingService, private customersService: CustomersService) { }

  ngOnInit() {
    this.loadingService.register('customers');
    this.customersService.query<Array<Customer>>({sort: 'created', order: 'desc'})
      .subscribe(customers => {
        this.customers = customers;
        this.loadingService.resolve('customers');
      });
  }
}
