import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-lista-paises',
  templateUrl: './lista-paises.component.html',
  styleUrls: ['./lista-paises.component.css']
})
export class ListaPaisesComponent 
{

  public paisesAfricanos:any;
  public paisesEuropeos:any;
  public paisSeleccionado:string = "";
  @Output () eleccionPaisEvento: EventEmitter<any> = new EventEmitter();

  constructor(private api:ApiService)
  {

  }

  async ngOnInit()
  {
    const observableAfrica = this.api.obtenerInfo("https://restcountries.com/v3.1/region/africa");
    const observableEuropa = this.api.obtenerInfo("https://restcountries.com/v3.1/region/europe");
    

    this.paisesAfricanos = await firstValueFrom(observableAfrica);
    this.paisesEuropeos = await firstValueFrom(observableEuropa);

    console.log(this.paisesEuropeos[20]["name"]["common"])
    console.log(this.paisesAfricanos)
  }

  verificarPais(pais:any)
  {
    this.cambiarHoverPais(pais);
    this.eleccionPaisEvento.emit(pais);
    this.paisSeleccionado = "";
  }

  cambiarHoverPais(pais:any)
  {
    this.paisSeleccionado = pais["name"]["common"];
  }

}
