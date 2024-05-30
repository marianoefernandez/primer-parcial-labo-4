import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeladosRoutingModule } from './helados-routing.module';
import { CrearHeladoComponent } from './crear-helado/crear-helado.component';
import { ModificarHeladoComponent } from './modificar-helado/modificar-helado.component';
import { BorrarHeladoComponent } from './borrar-helado/borrar-helado.component';
import { HeladosComponent } from './helados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CrearHeladoComponent,ModificarHeladoComponent,BorrarHeladoComponent,HeladosComponent],
  imports: [
    CommonModule,
    HeladosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HeladosModule { }
