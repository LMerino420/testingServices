import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia mostrar un nombre {{person?.name}}', () => {
    component.person = new Person('Lev', 'Merino', 26, 40, 1.85);
    expect(component.person.name).toEqual('Lev');
  });

  it('Deberia tener un <h3>Hola, {{person?.name}}</h3>', () => {
    //Arrange
    component.person = new Person('Andrei', 'Merino', 26, 40, 1.85);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element?.textContent).toEqual(expectMsg);
  });

  it('Deberia tener un <p>Mi altura es {{person?.age}}</p>', () => {
    //Arrange
    component.person = new Person('Andrei', 'Merino', 26, 40, 1.85);
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(pElement?.textContent).toContain(component.person.height);
  });

  it('Deberia mostrar el IMC cuando llame el metodo [calcularIMC]', () => {
    //Arrage
    const expectMsg = 'Overweight';
    component.person = new Person('Leo', 'Messi', 26, 84, 1.8);
    const btn = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;
    //Act
    component.calcularIMC();
    fixture.detectChanges();
    //Assert
    expect(btn.textContent).toContain(expectMsg);
  });

  it('Deberia mostrar el IMC cuando haga click', () => {
    //Arrage
    const expectMsg = 'Overweight';
    component.person = new Person('Leo', 'Messi', 26, 84, 1.8);
    const btnDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const btnElement = btnDebug.nativeElement;
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(btnElement.textContent).toContain(expectMsg);
  });

  it('Llamado al evento OUTPUT cuando se hace click', () => {
    //Arrange
    const expextPerson = new Person('Leo', 'Messi', 26, 84, 1.8);
    component.person = expextPerson;
    const btnDebug = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectdPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectdPerson = person;
    });
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(selectdPerson).toEqual(expextPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Ansu', 'Fati', 19, 35, 1.7);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

fdescribe('PersonComponent desde HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia mostar el nombre de una persona', () => {
    //Arrange
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('Deberia levantar un envento cuando sea clickeado', () => {
    //Arrange
    const expectName = component.person.name;
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
