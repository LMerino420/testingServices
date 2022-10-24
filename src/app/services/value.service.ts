import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private value = 'My value';

  constructor() {}

  get() {
    return this.value;
  }

  set(value: string) {
    this.value = value;
  }

  getPromise() {
    return Promise.resolve('Promise value');
  }

  getObservable() {
    return of('Obsevable value');
  }
}
