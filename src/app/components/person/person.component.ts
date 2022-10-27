import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person!: Person;
  @Output() onSelected = new EventEmitter<Person>();
  imc = '';

  constructor() {}

  ngOnInit(): void {}

  calcularIMC() {
    this.imc = this.person.calcularIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }
}
