import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeladosComponent } from './helados.component';

const routes: Routes = 
[
  {
    path:'',
    component:HeladosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeladosRoutingModule { }
