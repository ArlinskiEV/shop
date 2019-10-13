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

  public buyProduct(product: ProductModel): void {
    this.productsService.buyProduct(product);
    this.cart.next([...this.cart.value, product]);
  }
}
