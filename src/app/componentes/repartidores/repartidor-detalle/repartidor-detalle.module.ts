import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepartidorDetalleRoutingModule } from './repartidor-detalle-routing.module';
import { RepartidorDetalleComponent } from './repartidor-detalle.component';
import { ListaRepartidoresComponent } from '../lista-repartidores/lista-repartidores.component';
import { RepartidorSeleccionadoComponent } from '../repartidor-seleccionado/repartidor-seleccionado.component';
import { PaisRepartidorComponent } from '../pais-repartidor/pais-repartidor.component';


@NgModule({
  declarations: [RepartidorDetalleComponent,ListaRepartidoresComponent,RepartidorSeleccionadoComponent,PaisRepartidorComponent],
  imports: [
    CommonModule,
    RepartidorDetalleRoutingModule
  ]
})
export class RepartidorDetalleModule { }
