import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductModel } from 'src/app/products/models/product';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less']
})
export class CartListComponent extends BaseComponent implements OnInit {
  public products: Array<ProductModel> = [];
  public sum: number = 0;

  constructor(private readonly cartService: CartService) {
    super();
  }

  public ngOnInit(): void {
    this.unsubscribeOnDestroy(
      this.cartService
        .getProductsInCart()
        .subscribe((products: Array<ProductModel>) => {
          this.products = products;
          this.sum = products
            .reduce((acm: number, product: ProductModel) => acm + product.price, 0);
        })
    );
  }
}
