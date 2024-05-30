import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { Repartidor } from 'src/app/interfaces/repartidor';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-lista-repartidores',
  templateUrl: './lista-repartidores.component.html',
  styleUrls: ['./lista-repartidores.component.css']
})
export class ListaRepartidoresComponent 
{

  public listaRepartidores : Repartidor[] = [];
  public nombre : string = "";
  public dni : any = ""
  @Output() eventoRepartidor = new EventEmitter<Repartidor>();


  constructor(private firestore:FirestoreService,private spinner:NgxSpinnerService)
  {

  }

  async ngOnInit()
  {
    this.spinner.show()
    const observableRepartidores = this.firestore.obtenerRepartidores();
    this.listaRepartidores = await firstValueFrom(observableRepartidores)
    console.log(this.listaRepartidores);

    setTimeout(() => {
      this.spinner.hide()
    }, 100);
  }

  cambiarHoverRepartidor(repartidor:any)
  {
    this.nombre = repartidor["nombre"];
    this.dni = repartidor["dni"];
  }

  elegirRepartidor(repartidor:any)
  {
    this.eventoRepartidor.emit(repartidor);
  }
}

