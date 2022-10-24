import { ValueService } from './value.service';

fdescribe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
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
