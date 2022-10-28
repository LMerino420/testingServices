import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of, defer } from 'rxjs';
import { generateManyProducts } from '../../models/product.mock';
import { ProductsService } from '../../services/product.service';

import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [{ provide: ProductsService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    const productMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productMock));
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('Pruebas para "getAllProducts"', () => {
    it('Deberia retornar una lista de productos ', () => {
      //Arrange
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productMock));
      const countPrev = component.products.length;
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      //Assert
      expect(component.products.length).toEqual(productMock.length + countPrev);
    });

    it('Deberia cambiar el status de "loading" a "success"', fakeAsync(() => {
      //Arrange
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.resolve(productMock))
      );
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick();
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success');
    }));

    it('Deberia cambiar el status de "loading" a "error"', fakeAsync(() => {
      //Arrange
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000);
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error');
    }));
  });
});
