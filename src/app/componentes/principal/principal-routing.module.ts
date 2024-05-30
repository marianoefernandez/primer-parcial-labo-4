import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = 
[
  {
    path:"",redirectTo:"home",pathMatch:"full"
  },
  {
    path:'home',
    loadChildren: () => import('../home/home.module').then(modelos => modelos.HomeModule),
  },
  {
    path:'repartidores',
    loadChildren: () => import('../repartidores/repartidores.module').then(modelos => modelos.RepartidoresModule),
  }
  ,
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"**", redirectTo:"error"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
