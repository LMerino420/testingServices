import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of, defer } from 'rxjs';
import { ValueService } from '../../services/value.service';
import { generateManyProducts } from '../../models/product.mock';
import { ProductsService } from '../../services/product.service';

import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromise',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

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

  describe('Pruebas para "callPromise"', () => {
    it('Deberia llamar a la promesa', async () => {
      //Arrage
      const mockMsg = 'Mock string';
      valueService.getPromise.and.returnValue(Promise.resolve(mockMsg));
      //Act
      await component.callPromise();
      fixture.detectChanges();
      //Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromise).toHaveBeenCalled();
    });

    it('Deberia mostrar <p>Mock string</p> cuando el boton sea clickeado', fakeAsync(() => {
      //Arrage
      const mockMsg = 'Mock string';
      valueService.getPromise.and.returnValue(Promise.resolve(mockMsg));
      const btnDe = fixture.debugElement.query(By.css('.btn-promisse'));
      //Act
      btnDe.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const rtaDe = fixture.debugElement.query(By.css('p.p-rta'));
      //Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromise).toHaveBeenCalled();
      expect(rtaDe.nativeElement.textContent).toEqual(mockMsg);
    }));
  });
});
