import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './valueFake.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['get']);
    TestBed.configureTestingModule({
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });

  it('Creacion el servicio', () => {
    expect(masterService).toBeTruthy();
  });

  // it('Deberia retornar "My value" desde el servicio real', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBeTruthy();
  // });

  // it('Deberia retornar "Fake value" desde el servicio fake', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(
  //     fakeValueService as unknown as ValueService
  //   );
  //   expect(masterService.getValue()).toBe('Fake value');
  // });

  // it('Deberia retornar "Object value" desde el objeto', () => {
  //   const fake = { get: () => 'Object value' };
  //   const masterService = new MasterService(fake as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('Object value');
  // });

  it('Deberia llamar a "getValue" desde ValueServices', () => {
    valueServiceSpy.get.and.returnValue('Fake value spy');
    expect(masterService.getValue()).toBe('Fake value spy');
    expect(valueServiceSpy.get).toHaveBeenCalled();
    expect(valueServiceSpy.get).toHaveBeenCalledTimes(1);
  });
});
