import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { CartService } from 'src/app/cart/services/cart.service';
import { of } from 'rxjs';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async(() => {
    cartServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsInCart', 'buyProduct']);
    cartServiceSpy.getProductsInCart.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ CartListComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
