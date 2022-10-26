import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';

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

  afterEach(() => {
    httpCrtl.verify();
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
    });

    it('Deberia enviar query params con limit 10 & offset 10', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 10;
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
    });
  });

  describe('Test para "create"', () => {
    it('Deberia retornar un nuevo producto', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Prod',
        price: 420,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 420,
      };
      //Act
      productService.create({ ...dto }).subscribe((data) => {
        //Asset
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Test para "update"', () => {
    it('Deberia actualizar un producto', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new title',
      };
      const productId = '1';
      //Act
      productService.update(productId, { ...dto }).subscribe((data) => {
        //Asset
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Test para "delete"', () => {
    it('Deberia eliminar un producto', (doneFn) => {
      //Arrange
      const mockData = true;
      const productId = '1';
      //Act
      productService.delete(productId).subscribe((data) => {
        //Asset
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('Test para "getOne"', () => {
    it('Deberia retornar un producto', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const productId = '1';
      //Act
      productService.getOne(productId).subscribe((data) => {
        //Asset
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('Prueba de error "NOT FOUND"', (doneFn) => {
      //Arrange
      const productId = '1';
      const msgError = 'Error 404';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      //Act
      productService.getOne(productId).subscribe({
        error: (error) => {
          //Assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });

    it('Prueba de error "CONFLICT"', (doneFn) => {
      //Arrange
      const productId = '1';
      const msgError = 'Error 404';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      //Act
      productService.getOne(productId).subscribe({
        error: (error) => {
          //Assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });

    it('Prueba de error "UNAUTHORIZED"', (doneFn) => {
      //Arrange
      const productId = '1';
      const msgError = 'Error 404';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      //Act
      productService.getOne(productId).subscribe({
        error: (error) => {
          //Assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        },
      });
      // Http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpCrtl.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });
  });
});
