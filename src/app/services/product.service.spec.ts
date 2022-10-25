import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts } from '../models/product.mock';

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
      const mockData: Product[] = generateManyProducts();
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
});
