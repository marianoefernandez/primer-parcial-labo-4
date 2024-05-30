import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaisesComponent } from './lista-paises.component';

describe('ListaPaisesComponent', () => {
  let component: ListaPaisesComponent;
  let fixture: ComponentFixture<ListaPaisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPaisesComponent]
    });
    fixture = TestBed.createComponent(ListaPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
