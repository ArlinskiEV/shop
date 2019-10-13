import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductModel } from 'src/app/products/models/product';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent extends BaseComponent implements OnInit {
  public products: Array<ProductModel> = [];

  constructor(private readonly cartService: CartService) {
    super();
  }

  public ngOnInit(): void {
    this.unsubscribeOnDestroy(
      this.cartService
        .getProductsInCart()
        .subscribe((products: Array<ProductModel>) => {
          this.products = products;
        })
    );
  }
}
