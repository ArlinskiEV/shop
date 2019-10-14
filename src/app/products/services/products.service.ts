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

  public buyProduct(productToBuy: ProductModel): boolean {
    let result: boolean = true;
    const productIndex: number = this.getProductIndex(productToBuy);
    const product: ProductModel = new ProductModel({
      ...productToBuy,
      count: this.products.value[productIndex].count - 1
    });
    if (product.count < 0) {
      product.count = 0;
      result = false;
    }

    this.products.next([
      ...this.products.value.slice(0, productIndex),
      product,
      ...this.products.value.slice(productIndex + 1)
    ]);

    return result;
  }

  public returnProduct(productToReturn: ProductModel, count: number): void {
    const productIndex: number = this.getProductIndex(productToReturn);
    const product: ProductModel = new ProductModel({
      ...productToReturn,
      count: this.products.value[productIndex].count + count
    });

    this.products.next([
      ...this.products.value.slice(0, productIndex),
      product,
      ...this.products.value.slice(productIndex + 1)
    ]);
  }

  private getProductIndex(product: ProductModel): number {
    return this.products.value
      .findIndex((p: ProductModel) => p.productName === product.productName);
  }
}
