import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testingServices';

  ngOnInit() {
    const calculator = new Calculator();
    const rta = calculator.multiplicar(1, 4);
  }
}
