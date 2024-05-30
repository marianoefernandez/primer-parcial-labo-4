import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRepartidorComponent } from './alta-repartidor.component';

describe('AltaRepartidorComponent', () => {
  let component: AltaRepartidorComponent;
  let fixture: ComponentFixture<AltaRepartidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaRepartidorComponent]
    });
    fixture = TestBed.createComponent(AltaRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
