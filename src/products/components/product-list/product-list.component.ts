import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from 'src/products/services/products.service';
import { ProductModel } from 'src/products/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  public products: Array<ProductModel> = [];

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly productsService: ProductsService
  ) { }

  public ngOnInit(): void {
    // от подписки надо отписаться
    this.productsService.getProducts()
      .subscribe((products: Array<ProductModel>) => {
        this.products = products;
        this.cdRef.markForCheck(); // а это действительно тут необходимо делать?
      });
  }

}
