import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProductModel } from 'src/products/models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cart: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject([]);

  constructor() { }

  public getProductsInCart(): Observable<Array<ProductModel>> {
    return this.cart.asObservable();
  }

  public buyProduct(product: ProductModel): void {
    this.cart.next([...this.cart.value, product]);
  }
}
