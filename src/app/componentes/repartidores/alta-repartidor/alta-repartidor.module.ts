import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltaRepartidorRoutingModule } from './alta-repartidor-routing.module';
import { AltaRepartidorComponent } from './alta-repartidor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaPaisesComponent } from '../../lista-paises/lista-paises.component';


@NgModule({
  declarations: [AltaRepartidorComponent,ListaPaisesComponent],
  imports: [
    CommonModule,
    AltaRepartidorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AltaRepartidorModule { }
