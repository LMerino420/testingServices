export class FakeValueService {
  constructor() {}

  get() {
    return 'Fake value';
  }

  set(value: string) {}

  getPromise() {
    return Promise.resolve('Fake Promise value');
  }
}
