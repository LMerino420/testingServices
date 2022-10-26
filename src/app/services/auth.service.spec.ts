import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpCrtl: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpCrtl = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpCrtl.verify();
  });

  it('Creacion del servicio', () => {
    expect(authService).toBeTruthy();
  });

  describe('Pruebas para "login"', () => {
    it('Deberia retornar un token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'lev@mail.com';
      const pwd = '161096';
      // Act
      authService.login(email, pwd).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpCrtl.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });

    it('Deberia llamar al metodo "saveToken"', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'lev@mail.com';
      const pwd = '161096';
      spyOn(tokenService, 'saveToken').and.callThrough();
      // Act
      authService.login(email, pwd).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('123123');
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpCrtl.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });
  });
});
