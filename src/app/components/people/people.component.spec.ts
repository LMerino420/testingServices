import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia tener una lista desde app-person components', () => {
    //Arrange
    component.people = [
      new Person('Ansu', 'Fati', 18, 15, 1.25),
      new Person('Robert', 'Lewandowski', 32, 25, 1.85),
      new Person('Ousmane', 'Dembele', 27, 20, 1.8),
    ];
    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    //Assert
    expect(debugElement.length).toEqual(3);
  });

  it('Deberia ejecutar el evento selectedPerson cuando haga click', () => {
    //Arrage
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('Deberia renderizar selectedPerson', () => {
    //Arrage
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(By.css('.divSelected ul > li'));
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(
      component.selectedPerson?.name
    );
  });
});
