import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ProductModel, ProductsCountsStore, ProductsStore } from 'src/app/products/models/product';
import { ProductsService } from 'src/app/products/services/products.service';

export interface ICartItem {
  product: ProductModel;
  count: number;
  available: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private readonly data: BehaviorSubject<Array<ICartItem>> = new BehaviorSubject([]);
  private readonly subscriptions: Array<Subscription> = [];

  private productsCounts: ProductsCountsStore = {};
  private products: ProductsStore = {};
  private counts: ProductsCountsStore = {};

  constructor(private readonly productsService: ProductsService) {
    this.subscriptions.push(
      this.productsService.getProducts()
        .subscribe((products: ProductsStore) => {
          this.products = products;
          this.updateData();
        }),
      this.productsService.getCounts()
        .subscribe((productsCounts: ProductsCountsStore) => {
          this.productsCounts = productsCounts;
          this.updateData();
        })
    );
  }

  private updateData() {
    this.data.next(
      Object.keys(this.products)
        .filter((id: string) => this.counts[id])
        .map((id: string) => ({
          product: this.products[id],
          count: this.counts[id],
          available: this.productsCounts[id]
        }))
    );
  }

  public ngOnDestroy() {
    this.subscriptions
      .forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public getProductsInCart(): Observable<Array<ICartItem>> {
    return this.data.asObservable();
  }

  public buyProduct(product: ProductModel): void {
    const productCount: number = this.counts[product.id] || 0;
    if (!this.productsService.buyProduct(product)) {
      return;
    }

    this.counts = {
      ...this.counts,
      [product.id]: productCount + 1
    };
    this.updateData();
  }

  public subProduct(product: ProductModel): void {
    const productCount: number = this.counts[product.id];
    if (productCount === 1) {
      this.remProduct(product);
      return;
    }

    this.productsService.returnProduct(product, 1);

    this.counts = {
      ...this.counts,
      [product.id]: productCount - 1
    };
    this.updateData();
  }

  public remProduct(product: ProductModel): void {
    const productCount: number = this.counts[product.id];
    this.productsService.returnProduct(product, productCount);

    this.counts = {
      ...this.counts,
      [product.id]: 0
    };

    this.updateData();
  }
}
