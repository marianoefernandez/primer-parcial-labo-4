import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path:"",redirectTo:"alta-repartidor",pathMatch:"full"
  },
  {
    path:'alta-repartidor',
    loadChildren: () => import('../repartidores/alta-repartidor/alta-repartidor.module').then(modelos => modelos.AltaRepartidorModule),
  },
  {
    path:'repartidor-detalle',
    loadChildren: () => import('../repartidores/repartidor-detalle/repartidor-detalle.module').then(modelos => modelos.RepartidorDetalleModule),
  },
  {
    path:"**", redirectTo:"error"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepartidoresRoutingModule { }
