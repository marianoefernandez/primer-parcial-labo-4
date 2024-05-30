import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHeladoComponent } from './modificar-helado.component';

describe('ModificarHeladoComponent', () => {
  let component: ModificarHeladoComponent;
  let fixture: ComponentFixture<ModificarHeladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarHeladoComponent]
    });
    fixture = TestBed.createComponent(ModificarHeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
