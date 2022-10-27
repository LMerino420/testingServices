import { Person } from './person.model';

describe('Pruebas para Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Lev', 'Merino', 26, 40, 1.8);
  });

  it('Verificar si posee los atributos', () => {
    expect(person.name).toEqual('Lev');
    expect(person.lastName).toEqual('Merino');
    expect(person.age).toEqual(26);
    expect(person.weight).toEqual(40);
    expect(person.height).toEqual(1.8);
  });

  describe('Puebas para [calcularIMC]', () => {
    it('Deberia retornar un string:Not Found', () => {
      //Arrage
      person.weight = -40;
      person.height = 1.8;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Not Found');
    });

    it('Deberia retornar un string:Down', () => {
      //Arrage
      person.weight = 40;
      person.height = 1.8;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Down');
    });

    it('Deberia retornar un string:Normal', () => {
      //Arrage
      person.weight = 70;
      person.height = 1.85;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Normal');
    });

    it('Deberia retornar un string:Overweight', () => {
      //Arrage
      person.weight = 84;
      person.height = 1.8;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Overweight');
    });

    it('Deberia retornar un string:Overweight level 1', () => {
      //Arrage
      person.weight = 89;
      person.height = 1.8;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Overweight level 1');
    });

    it('Deberia retornar un string:Overweight level 2', () => {
      //Arrage
      person.weight = 85;
      person.height = 1.5;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Overweight level 2');
    });

    it('Deberia retornar un string:Overweight level 3', () => {
      //Arrage
      person.weight = 95;
      person.height = 1.5;
      //Act
      const rta = person.calcularIMC();
      //Assert
      expect(rta).toEqual('Overweight level 3');
    });
  });
});
