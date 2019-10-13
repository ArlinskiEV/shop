import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent {
  @Input()
  public readonly product: ProductModel;
  @Output()
  public readonly buyPriduct: EventEmitter<ProductModel> = new EventEmitter();

  public onBuy(): void {
    console.log(`Buy product: ${this.product}`);
    this.buyPriduct.emit(this.product);
  }

}
