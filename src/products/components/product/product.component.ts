import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/products/models/product';
import { CartService } from 'src/cart/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input()
  public readonly product: ProductModel;

  constructor(
    private readonly cartService: CartService
  ) { }

  public ngOnInit(): void {
  }

  public onBuy(): void {
    console.log(`Buy product: ${this.product}`);
    this.cartService.buyProduct(this.product);
  }

}
