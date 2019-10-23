import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ProductModel, ProductsCountsStore, ProductsStore } from 'src/app/products/models/product';
import { ProductsService } from 'src/app/products/services/products.service';

export interface ICartItem {
  product: ProductModel;
  count: number;
  available: number;
}

export interface ICartInfo {
  carts: Array<ICartItem>;
  totalQuantity: number;
  totalSum: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private readonly data: BehaviorSubject<ICartInfo> = new BehaviorSubject({
    carts: [],
    totalQuantity: 0,
    totalSum: 0
  });
  private readonly subscriptions: Array<Subscription> = [];

  private productsCounts: ProductsCountsStore = {};
  private products: ProductsStore = {};
  private counts: ProductsCountsStore = {};
  private totalQuantity: number = 0;
  private totalSum: number = 0;
  private cartProducts: Array<ICartItem> = [];

  constructor(private readonly productsService: ProductsService) {
    this.subscriptions.push(
      this.productsService.getProducts()
        .subscribe((products: ProductsStore) => {
          this.products = products;
          this.updateCartData();
        }),
      this.productsService.getCounts()
        .subscribe((productsCounts: ProductsCountsStore) => {
          this.productsCounts = productsCounts;
          this.updateCartData();
        })
    );
  }

  private updateCartData(): void {
    this.cartProducts = Object.keys(this.products)
      .filter((id: string) => this.counts[id])
      .map((id: string) => ({
        product: this.products[id],
        count: this.counts[id],
        available: this.productsCounts[id]
      }));

    this.totalQuantity = Object.values(this.counts)
      .reduce((counts: number, count: number) => counts + count, 0);
    this.totalSum = this.cartProducts
      .reduce((sum: number, product: ICartItem) => sum + (product.count * product.product.price), 0);

    this.data.next({
      carts: this.cartProducts,
      totalQuantity: this.totalQuantity,
      totalSum: this.totalSum
    });
  }

  public ngOnDestroy() {
    this.subscriptions
      .forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public getProductsInCart(): Observable<ICartInfo> {
    return this.data.asObservable();
  }

  public addProduct(product: ProductModel, count: number): void {
    const productCount: number = this.counts[product.id] || 0;
    if (!this.productsService.buyProduct(product, count)) {
      return;
    }

    this.counts = {
      ...this.counts,
      [product.id]: productCount + count
    };
    this.updateCartData();
  }

  public increaseQuantity(product: ProductModel): void {
    const productCount: number = this.counts[product.id] || 0;
    if (!this.productsService.buyProduct(product)) {
      return;
    }

    this.counts = {
      ...this.counts,
      [product.id]: productCount + 1
    };
    this.updateCartData();
  }

  public decreaseQuantity(product: ProductModel): void {
    const productCount: number = this.counts[product.id];
    if (productCount === 1) {
      this.removeProduct([product]);
      return;
    }

    this.productsService.returnProduct(product, 1);

    this.counts = {
      ...this.counts,
      [product.id]: productCount - 1
    };
    this.updateCartData();
  }

  public removeProduct(products: Array<ProductModel>): void {
    products.forEach((product: ProductModel) => {
      const productCount: number = this.counts[product.id];
      this.productsService.returnProduct(product, productCount);

      this.counts = {
        ...this.counts,
        [product.id]: 0
      };
    });

    this.updateCartData();
  }

  public removeAllProducts(): void {
    this.removeProduct(
      Object.keys(this.products)
        .filter((id: string) => this.counts[id])
        .map((id: string) => this.products[id])
    );
  }
}
