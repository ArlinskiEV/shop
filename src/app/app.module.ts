import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstComponent } from 'src/app/first/first.component';
import { ProductComponent } from 'src/app/products/components/product/product.component';
import { ProductListComponent } from 'src/app/products/components/product-list/product-list.component';
import { CartComponent } from 'src/app/cart/components/cart/cart.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
