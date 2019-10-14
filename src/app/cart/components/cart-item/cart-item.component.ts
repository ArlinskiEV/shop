import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input()
  public product: ProductModel;
  @Output()
  public changeCount: EventEmitter<any> = new EventEmitter();

  public onAdd(): void {
    this.changeCount.emit({ add: this.product });
  }

  public onSub(): void {
    this.changeCount.emit({ sub: this.product });
  }

  public onRemove(): void {
    this.changeCount.emit({ rem: this.product });
  }
}
