import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductModel } from 'src/app/products/models/product';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent extends BaseComponent implements OnInit {
  public products: Array<ProductModel> = [];
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
        .subscribe((products: Array<ProductModel>) => {
          this.products = products;
          const { sum, count } = products
            .reduce(({ sum, count }: { sum: number, count: number }, product: ProductModel) =>
              ({
                sum: sum + (product.price * product.count),
                count: count + product.count
              }),
              ({ sum: 0, count: 0})
            );
          this.sum = sum;
          this.count = count;

          this.cdRef.markForCheck();
        })
    );
  }

  public onChangeCount({ add, sub, rem }: { add?: ProductModel, sub?: ProductModel, rem: ProductModel }): void {
    // TODO: need refactoring
    if (add) {
      this.cartService.buyProduct(add);
    }
    else if (sub) {
      this.cartService.subProduct(sub);
    }
    else if (rem) {
      this.cartService.remProduct(rem);
    }
  }
}
