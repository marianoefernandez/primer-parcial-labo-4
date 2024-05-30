import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path:"",redirectTo:"login",pathMatch:"full"
  },
  {
    path:'login',
    loadChildren: () => import('../login/login.module').then(modelos => modelos.LoginModule),
  },
  {
    path:"**", redirectTo:"error"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
