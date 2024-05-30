import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarHeladoComponent } from './borrar-helado.component';

describe('BorrarHeladoComponent', () => {
  let component: BorrarHeladoComponent;
  let fixture: ComponentFixture<BorrarHeladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarHeladoComponent]
    });
    fixture = TestBed.createComponent(BorrarHeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
