import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pais-repartidor',
  templateUrl: './pais-repartidor.component.html',
  styleUrls: ['./pais-repartidor.component.css']
})
export class PaisRepartidorComponent {

  @Input() paisRepartidor: any; 

  constructor()
  {

  }

  isObject(value:any)
  {
    return (typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null);
  }

}
