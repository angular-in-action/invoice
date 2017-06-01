import { Component, OnInit } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { CustomersService, Customer } from '@aia/services';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customer: Customer;

  constructor(
    private loadingService: TdLoadingService,
    private router: Router,
    private dialogService: TdDialogService,
    private customersService: CustomersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingService.register('customer');
    this.route.params.map((params: Params) => params.customerId).subscribe(customerId => {
      if (customerId) {
        this.customersService.get<Customer>(customerId).subscribe(customer => {
          this.customer = customer;
          this.loadingService.resolve('customer');
        });
      } else {
        this.customer = new Customer();
        this.loadingService.resolve('customer');
      }
    });
  }

  save() {
    if (this.customer.id) {
      this.customersService.update<Customer>(this.customer.id, this.customer).subscribe(response => {
        this.viewCustomer(response.id);
      });
    } else {
      this.customersService.create<Customer>(this.customer).subscribe(response => {
        this.viewCustomer(response.id);
      });
    }
  }

  delete() {
    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this customer?',
      title: 'Confirm',
      acceptButton: 'Delete'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.loadingService.register('customer');
        this.customersService.delete(this.customer.id).subscribe(response => {
          this.loadingService.resolve('customer');
          this.customer.id = null;
          this.cancel();
        });
      }
    });
  }

  cancel() {
    if (this.customer.id) {
      this.router.navigate(['/customers', this.customer.id]);
    } else {
      this.router.navigateByUrl('/customers');
    }
  }

  private viewCustomer(id: number) {
    this.router.navigate(['/customers', id]);
  }
}
