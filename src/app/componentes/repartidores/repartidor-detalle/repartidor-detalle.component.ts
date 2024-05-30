import { Component } from '@angular/core';
import { Repartidor } from 'src/app/interfaces/repartidor';

@Component({
  selector: 'app-repartidor-detalle',
  templateUrl: './repartidor-detalle.component.html',
  styleUrls: ['./repartidor-detalle.component.css']
})
export class RepartidorDetalleComponent {

  public repartidorSeleccionado:any = false;

  public elegirRepartidor(repartidor:Repartidor)
  {
    this.repartidorSeleccionado = repartidor;
    console.log(this.repartidorSeleccionado);
  }

}
