import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>DEFAULT</h5>
    <h5 highligth="yellow">VALOR DEL H5</h5>
    <p highligth="red">Parrafo</p>
    <p>Otro parrafo</p>
  `,
})
class HostComponent {}

fdescribe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
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

  it('Deberia mostrar tres elementos con la directiva highligth', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsWhithout = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );
    expect(elements.length).toEqual(3);
    expect(elementsWhithout.length).toEqual(1);
  });

  it('Los elementos deberian hacer match con el bgColor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('green');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('red');
    expect(elements.length).toEqual(3);
  });

  it('El elemento h5.title deberia ser hacer match con defaultColor', () => {
    const titleDe = fixture.debugElement.query(By.css('.title'));
    const dir = titleDe.injector.get(HighligthDirective);
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });
});
