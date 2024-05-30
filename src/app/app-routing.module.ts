import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { noEstaLogueadoGuard } from './guards/no-esta-logueado.guard';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';
import { esAdminGuard } from './guards/es-admin.guard';

const routes: Routes = [
  {
    path:"",redirectTo:"principal",pathMatch:"full"
  },
  {
    path:"sesiones",
    loadChildren: ()=>import('./componentes/sesiones/sesiones.module').then(modulo => modulo.SesionesModule),
    canActivate:[noEstaLogueadoGuard]
  },
  {
    path:"principal",
    loadChildren: ()=>import('./componentes/principal/principal.module').then(modulo => modulo.PrincipalModule)
  },
  {
    path:"repartidores",
    loadChildren: ()=>import('./componentes/repartidores/repartidores.module').then(modulo => modulo.RepartidoresModule),
    canActivate:[estaLogueadoGuard]
  },
  {
    path:"helados",
    loadChildren: ()=>import('./componentes/helados/helados.module').then(modulo => modulo.HeladosModule),
    canActivate:[estaLogueadoGuard,esAdminGuard]
  },
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"**", redirectTo:"error"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
