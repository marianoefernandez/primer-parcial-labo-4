import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepartidorDetalleComponent } from './repartidor-detalle.component';

const routes: Routes = 
[
  {
    path:'',
    component:RepartidorDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepartidorDetalleRoutingModule { }
