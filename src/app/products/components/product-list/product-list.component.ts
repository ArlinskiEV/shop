import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { ProductModel } from 'src/app/products/models/product';
import { BaseComponent } from 'src/app/base/base.component';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent extends BaseComponent implements OnInit {

  public products: Array<ProductModel> = [];

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.unsubscribeOnDestroy(
      this.productsService.getProducts()
        .subscribe((products: Array<ProductModel>) => {
          this.products = products;
          this.cdRef.markForCheck();
        })
    );
  }

  public onBuy(product: ProductModel): void {
    this.cartService.buyProduct(product);
  }
}
