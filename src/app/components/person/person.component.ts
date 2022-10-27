import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person!: Person;
  imc = '';

  constructor() {}

  ngOnInit(): void {}

  calcularIMC() {
    this.imc = this.person.calcularIMC();
  }
}
