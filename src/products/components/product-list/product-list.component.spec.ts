import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/products/services/products.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async(() => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
