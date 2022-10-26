import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

fdescribe('ProductService', () => {
  let productService: ProductsService;
  let httpCrtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httpCrtl = TestBed.inject(HttpTestingController);
  });

  it('Creacion del servicio', () => {
    expect(productService).toBeTruthy();
  });

  describe('Test para "getAllSimple"', () => {
    it('Deberia retornar una lista de productos', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      productService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      httpCrtl.verify();
    });
  });

  describe('Test para "getAll"', () => {
    it('Deberia retornar una lista de productos', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      httpCrtl.verify();
    });

    it('Deberia retornar una lista de productos con taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //100 * .13 = 13
        },
        {
          ...generateOneProduct(),
          price: 200, //200 * .13 = 26
        },
        {
          ...generateOneProduct(),
          price: 0, //0 * .13 = 0
        },
        {
          ...generateOneProduct(),
          price: -200, //-200 * .13 = 0
        },
      ];
      //Act
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(13);
        expect(data[1].taxes).toEqual(26);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      httpCrtl.verify();
    });

    it('Deberia enviar query params con limit 10 & offset 5', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 5;
      //Act
      productService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpCrtl.verify();
    });
  });
});
