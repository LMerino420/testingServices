import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('Deberia transformar "ROMA" a "AMOR"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('ROMA');
    expect(rta).toEqual('AMOR');
  });
});

@Component({
  template: `
    <h5>{{ 'LEV' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

fdescribe('Pruebas a reverse pipe desde un componente', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
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

  it('Deberia el h5 ser "VEL"', () => {
    const h5De = fixture.debugElement.query(By.css('h5'));
    expect(h5De.nativeElement.textContent).toEqual('VEL');
  });

  it('Deberia aplicar el reverse pipe cuando este tipeando en el input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const pDe = fixture.debugElement.query(By.css('p'));

    expect(pDe.nativeElement.textContent).toEqual('');

    inputEl.value = 'ROMA';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.nativeElement.textContent).toEqual('AMOR');
  });
});
