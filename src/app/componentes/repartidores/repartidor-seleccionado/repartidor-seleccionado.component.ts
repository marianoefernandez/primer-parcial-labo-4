import { Component, Input } from '@angular/core';
import { Repartidor } from 'src/app/interfaces/repartidor';

@Component({
  selector: 'app-repartidor-seleccionado',
  templateUrl: './repartidor-seleccionado.component.html',
  styleUrls: ['./repartidor-seleccionado.component.css']
})
export class RepartidorSeleccionadoComponent 
{

  @Input() repartidor!: Repartidor; 

}
