import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductModel, ProductsStore, ProductsCountsStore } from 'src/app/products/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly products: BehaviorSubject<ProductsStore> = new BehaviorSubject({});
  private readonly counts: BehaviorSubject<ProductsCountsStore> = new BehaviorSubject({});
  constructor() {
    this.products.next(this.createProducts(5));
    this.counts.next(this.createCounts(this.products.value));
  }

  private createProducts(count: number): ProductsStore {
    return Array(count)
      .fill(0)
      .reduce((products: ProductsStore) => {
        const product = ProductModel.fromFaker();
        return Object.assign(products, { [product.id]: product });
      }, {});
  }

  private createCounts(products: ProductsStore): ProductsCountsStore {
    return Object.keys(products)
      .reduce((counts: ProductsCountsStore, id) => {
        return Object.assign(counts, { [id]: Math.floor(Math.random() * 10) });
      }, {});
  }

  public getProducts(): Observable<ProductsStore> {
    return this.products.asObservable();
  }

  public getCounts(): Observable<ProductsCountsStore> {
    return this.counts.asObservable();
  }

  public buyProduct(product: ProductModel, count = 1): boolean {
    const productCount: number = this.counts.value[product.id];
    if (productCount < count) {
      return false;
    }

    this.counts.next({
      ...this.counts.value,
      [product.id]: productCount - count
    });
    return true;
  }

  public returnProduct(product: ProductModel, count: number): void {
    const productCount: number = this.counts.value[product.id];

    this.counts.next({
      ...this.counts.value,
      [product.id]: productCount + count
    });
  }
}
