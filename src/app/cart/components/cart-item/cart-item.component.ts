import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input()
  public item: ICartItem;
  @Output()
  public changeCount: EventEmitter<any> = new EventEmitter();

  public onAdd(): void {
    this.changeCount.emit({ add: this.item.product });
  }

  public onSub(): void {
    this.changeCount.emit({ sub: this.item.product });
  }

  public onRemove(): void {
    this.changeCount.emit({ rem: this.item.product });
  }
}
