import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { CustomersService, Customer } from '@aia/services';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer;

  constructor(
    private customersService: CustomersService,
    private loadingService: TdLoadingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingService.register('customer');
    this.route.params
      .map((params: Params) => params.customerId)
      .switchMap(customerId => this.customersService.get<Customer>(customerId))
      .subscribe(customer => {
        this.customer = customer;
        this.loadingService.resolve('customer');
      });
  }
}
