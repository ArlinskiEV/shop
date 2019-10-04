import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { CartService } from 'src/cart/services/cart.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async(() => {
    cartServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsInCart', 'buyProduct']);
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
