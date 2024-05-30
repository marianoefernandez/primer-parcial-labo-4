import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorDetalleComponent } from './repartidor-detalle.component';

describe('RepartidorDetalleComponent', () => {
  let component: RepartidorDetalleComponent;
  let fixture: ComponentFixture<RepartidorDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepartidorDetalleComponent]
    });
    fixture = TestBed.createComponent(RepartidorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
