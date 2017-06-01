import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoicesService, Invoice, CustomersService, Customer } from '@aia/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  invoice: Invoice;
  customer: Customer;
  customers: Customer[];
  total = 0;

  constructor(
    private loadingService: TdLoadingService,
    private invoicesService: InvoicesService,
    private router: Router,
    private dialogService: TdDialogService,
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
    this.loadingService.register('invoice');
    this.loadingService.register('customers');

    this.customersService.query<Array<Customer>>().subscribe(customers => {
      this.customers = customers;
      this.loadingService.resolve('customers');
    });

    this.route.params.map((params: Params) => params.invoiceId).subscribe(invoiceId => {
      if (invoiceId) {
        this.invoicesService.get<Invoice>(invoiceId).subscribe(invoice => {
          this.invoice = invoice;
          this.loadingService.resolve('invoice');
        });
      } else {
        this.invoice = new Invoice();
        this.loadingService.resolve('invoice');
      }
    });
  }

  save() {
    if (this.invoice.id) {
      this.invoicesService.update<Invoice>(this.invoice.id, this.invoice).subscribe(response => {
        this.viewInvoice(response.id);
      });
    } else {
      this.invoicesService.create<Invoice>(this.invoice).subscribe(response => {
        this.viewInvoice(response.id);
      });
    }
  }

  delete() {
    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this invoice?',
      title: 'Confirm',
      acceptButton: 'Delete'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.loadingService.register('invoice');
        this.invoicesService.delete(this.invoice.id).subscribe(response => {
          this.loadingService.resolve('invoice');
          this.invoice.id = null;
          this.cancel();
        });
      }
    });
  }

  cancel() {
    if (this.invoice.id) {
      this.router.navigate(['/invoices', this.invoice.id]);
    } else {
      this.router.navigateByUrl('/invoices');
    }
  }

  private viewInvoice(id: number) {
    this.router.navigate(['/invoices', id]);
  }

}
