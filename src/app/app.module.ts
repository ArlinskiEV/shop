import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstComponent } from 'src/first/first.component';
import { ProductComponent } from 'src/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
