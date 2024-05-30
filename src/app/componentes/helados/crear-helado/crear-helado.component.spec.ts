import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHeladoComponent } from './crear-helado.component';

describe('CrearHeladoComponent', () => {
  let component: CrearHeladoComponent;
  let fixture: ComponentFixture<CrearHeladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearHeladoComponent]
    });
    fixture = TestBed.createComponent(CrearHeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
