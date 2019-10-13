import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstComponent } from 'src/app/first/first.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent
  ],
  imports: [
    BrowserModule,
    CartModule,
    ProductsModule,
    SharedModule,
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
