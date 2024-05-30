import { Component, Input } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { iif } from 'rxjs';
import { Helado } from 'src/app/helados';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-borrar-helado',
  templateUrl: './borrar-helado.component.html',
  styleUrls: ['./borrar-helado.component.css']
})
export class BorrarHeladoComponent {

  @Input() heladoAEliminar:Helado | null = null;

  constructor(private firestore:FirestoreService,private spinner:NgxSpinnerService)
  {

  }

  eliminarHelado()
  {
    this.spinner.show()

    setTimeout(async () => {
      swal.fire({title:"Operacion Aceptada",text:"Baja realizada con exito",icon:"info"});
      if(this.heladoAEliminar != null)
      {
        await this.firestore.eliminarHelado(this.heladoAEliminar.sabor,this.heladoAEliminar.tipo);        
      }
      this.spinner.hide();
    }, 1000);

  }

  cencelarOperacion()
  {
    this.spinner.show()

    setTimeout(() => {
      swal.fire({title:"Operacion Cancelada",text:"Ha cancelado la baja",icon:"info"});
      this.spinner.hide();
    }, 1000);

  }

}
