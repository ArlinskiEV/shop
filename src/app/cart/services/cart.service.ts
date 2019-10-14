import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProductModel } from 'src/app/products/models/product';
import { ProductsService } from 'src/app/products/services/products.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cart: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject([]);

  constructor(private readonly productsService: ProductsService) { }

  public getProductsInCart(): Observable<Array<ProductModel>> {
    return this.cart.asObservable();
  }

  public buyProduct(productToBuy: ProductModel): void {
    if (!this.productsService.buyProduct(productToBuy)) {
      return;
    }

    const productIndex: number = this.getProductIndex(productToBuy);
    if (productIndex !== -1) {
      const product: ProductModel = new ProductModel({
        ...productToBuy,
        count: this.cart.value[productIndex].count + 1
      });

      this.cart.next([
        ...this.cart.value.slice(0, productIndex),
        product,
        ...this.cart.value.slice(productIndex + 1)
      ]);
    }
    else {
      const product: ProductModel = new ProductModel({
        ...productToBuy,
        count: 1
      });

      this.cart.next([
        ...this.cart.value,
        product
      ]);
    }
  }

  public subProduct(productToSub: ProductModel): void {
    if (productToSub.count === 1) {
      this.remProduct(productToSub);
      return;
    }

    this.productsService.returnProduct(productToSub, 1);

    const productIndex: number = this.getProductIndex(productToSub);
    const product: ProductModel = new ProductModel({
      ...productToSub,
      count: this.cart.value[productIndex].count - 1
    });

    this.cart.next([
      ...this.cart.value.slice(0, productIndex),
      product,
      ...this.cart.value.slice(productIndex + 1)
    ]);
  }

  public remProduct(productToRem: ProductModel): void {
    this.productsService.returnProduct(productToRem, productToRem.count);

    const productIndex: number = this.getProductIndex(productToRem);
    this.cart.next([
      ...this.cart.value.slice(0, productIndex),
      ...this.cart.value.slice(productIndex + 1)
    ]);
  }

  private getProductIndex(product: ProductModel): number {
    return this.cart.value
      .findIndex((p: ProductModel) => p.productName === product.productName);
  }
}
