import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProductModel } from 'src/app/products/models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly products: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject([]);

  constructor() {
    this.products
      .next(Array(5)
        .fill(0)
        .map(() => ProductModel.fromFaker())
      );
  }

  public getProducts(): Observable<Array<ProductModel>> {
    return this.products.asObservable();
  }

  public buyProduct(productToBuy: ProductModel): void {
    const productIndex: number = this.products.value
      .findIndex((product: ProductModel) => product === productToBuy);
    productToBuy.count -= 1;
    this.products.next([
      ...this.products.value.slice(0, productIndex),
      productToBuy,
      ...this.products.value.slice(productIndex + 1)
    ]);
  }
}
