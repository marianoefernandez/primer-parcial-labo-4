import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisRepartidorComponent } from './pais-repartidor.component';

describe('PaisRepartidorComponent', () => {
  let component: PaisRepartidorComponent;
  let fixture: ComponentFixture<PaisRepartidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisRepartidorComponent]
    });
    fixture = TestBed.createComponent(PaisRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
