export class Calculator {
  multiplicar(a: number, b: number) {
    return a * b;
  }

  dividir(a: number, b: number) {
    if (b === 0) {
      return null;
    }
    return a / b;
  }
}
