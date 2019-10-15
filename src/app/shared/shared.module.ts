import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    BaseComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective
  ]
})
export class SharedModule { }
