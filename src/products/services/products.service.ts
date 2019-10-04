import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public getProducts(): Observable<Array<ProductModel>> {
    return of(Array(25)
      .fill(0)
      .map(() => ProductModel.fromFaker())
    );
  }
}
