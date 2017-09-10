import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule, CovalentStepsModule, CovalentDialogsModule, CovalentLoadingModule } from '@covalent/core';

import {
  MdIconModule,
  MdSelectModule,
  MdListModule,
  MdButtonModule,
  MdInputModule,
  MdSlideToggleModule,
  MdDatepickerModule,
  MdNativeDateModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomerComponent } from './customer/customer.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { PhoneDirective } from './validators/phone.directive';

export const ROUTES = [
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoices/create', component: InvoiceFormComponent },
  { path: 'invoices/:invoiceId', component: InvoiceComponent },
  { path: 'invoices/:invoiceId/edit', component: InvoiceFormComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/create', component: CustomerFormComponent },
  { path: 'customers/:customerId', component: CustomerComponent },
  { path: 'customers/:customerId/edit', component: CustomerFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/invoices' },
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    InvoicesComponent,
    InvoiceComponent,
    CustomerComponent,
    InvoiceFormComponent,
    CustomerFormComponent,
    PhoneDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdNativeDateModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
