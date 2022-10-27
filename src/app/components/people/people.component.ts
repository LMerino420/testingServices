import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Ansu', 'Fati', 18, 15, 1.25),
    new Person('Robert', 'Lewandowski', 32, 25, 1.85),
  ];
  selectedPerson: Person | null = null;

  constructor() {}

  ngOnInit(): void {}

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
