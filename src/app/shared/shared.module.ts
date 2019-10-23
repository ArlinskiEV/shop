import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

const exports = [
  HighlightDirective,
  OrderByPipe
];

@NgModule({
  declarations: [
    BaseComponent,
    ...exports
  ],
  imports: [
    CommonModule
  ],
  exports
})
export class SharedModule { }
