import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('Creacion el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Pruebas para "get"', () => {
    it('Retornar "My value"', () => {
      expect(service.get()).toBe('My value');
    });
  });

  describe('Pruebas para "set"', () => {
    it('Cambia el valor de VALUE', () => {
      expect(service.get()).toBe('My value');
      service.set('Change');
      expect(service.get()).toBe('Change');
    });
  });

  describe('Pruebas para "getPromise"', () => {
    it('Retorna "Promise value"', async () => {
      const rta = await service.getPromise();
      expect(rta).toBe('Promise value');
    });
  });
});
