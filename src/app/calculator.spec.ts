import { Calculator } from './calculator';

describe('Pruebas para Calculator', () => {
  describe('#multiplicar', () => {
    it('Debe retornar nueve', () => {
      const calc = new Calculator();
      const rta = calc.multiplicar(3, 3);
      expect(rta).toEqual(9);
    });

    it('Debe retornar cinco', () => {
      const calc = new Calculator();
      const rta = calc.multiplicar(1, 5);
      expect(rta).toEqual(5);
    });
  });

  describe('#dividir', () => {
    it('Debe retornar valores enteros', () => {
      const calc = new Calculator();
      expect(calc.dividir(10, 5)).toEqual(2);
      expect(calc.dividir(8, 4)).toEqual(2);
    });

    it('Division por cero', () => {
      const calc = new Calculator();
      expect(calc.dividir(8, 0)).toBeNull();
      expect(calc.dividir(12, 0)).toBeNull();
    });
  });

  describe('Matchers', () => {
    it('Pruebas', () => {
      let name = 'Lev';
      let name2;
      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 1 === 2).toBeTruthy();
      expect(2 + 1 === 4).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(5);

      expect('123456').toMatch(/123/);
      expect(['Messi', 'Pedri', 'Gavi', 'Lewa']).toContain('Messi');
    });
  });
});
