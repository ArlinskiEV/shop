import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/products/services/products.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async(() => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
    productsServiceSpy.getProducts.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
