import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CartService, ICartItem, ICartInfo } from 'src/app/cart/services/cart.service';
import { ProductModel, ProductsStore } from 'src/app/products/models/product';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent extends BaseComponent implements OnInit {
  public items: Array<ICartItem> = [];
  public sum: number = 0;
  public count: number = 0;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly cartService: CartService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.unsubscribeOnDestroy(
      this.cartService
        .getProductsInCart()
        .subscribe(({ carts, totalQuantity, totalSum }: ICartInfo) => {
          this.items = carts;
          this.sum = totalSum;
          this.count = totalQuantity;

          this.cdRef.markForCheck();
        })
    );
  }

  public onChangeCount({ add, sub, rem }: { add?: ProductModel, sub?: ProductModel, rem: ProductModel }): void {
    // TODO: need refactoring
    if (add) {
      this.cartService.increaseQuantity(add);
    }
    else if (sub) {
      this.cartService.decreaseQuantity(sub);
    }
    else if (rem) {
      this.cartService.removeProduct([rem]);
    }
  }
}
