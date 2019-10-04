import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/cart/services/cart.service';
import { ProductModel } from 'src/products/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  public products: Array<ProductModel> = [];

  constructor(
    private readonly cartService: CartService
  ) { }

  public ngOnInit(): void {
    this.cartService.getProductsInCart()
      .subscribe((products: Array<ProductModel>) => {
        this.products = products;
      });
  }

}
