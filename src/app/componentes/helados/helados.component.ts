import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, firstValueFrom } from 'rxjs';
import { Helado } from 'src/app/helados';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-helados',
  templateUrl: './helados.component.html',
  styleUrls: ['./helados.component.css']
})
export class HeladosComponent implements OnInit {

  public opcionSeleccionada : string = ""
  public listaHelados : Helado[] = [];
  public sabor = '';
  public tipo = '';
  public heladoElegido : Helado | null = null; 
  //public suscripcion!: Subscription;
  @Output () darAlta: EventEmitter<Helado> = new EventEmitter();



  constructor(private router:Router, private firestore:FirestoreService, private spinner:NgxSpinnerService)
  {

  }
  
  async ngOnInit()
  {
    this.spinner.show()

    setTimeout(async () => {
      this.listaHelados = await firstValueFrom(this.firestore.obtenerHelados());
      this.spinner.hide();      
    }, 500);
  }

  // ngOnDestroy(): void {
  //   this.suscripcion.unsubscribe();
  // }

  public cambiarOpcion(opcion:string)
  {
    this.opcionSeleccionada = opcion;
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url)
  }

  public elegirHelado(helado:Helado)
  {
    this.heladoElegido = helado;
    console.log(this.heladoElegido);
  }

  public cambiarHoverHelado(helado:Helado)
  {
    this.sabor = helado["sabor"];
    this.tipo = helado["tipo"];
  }

  public async darAltaHelado(helado:Helado)
  {
    await this.firestore.agregarHelado(helado);
    this.listaHelados.push(helado);
    swal.fire({title:"Alta correcta",text:"Helado dado de alta correctamente",icon:"success"});
    this.opcionSeleccionada = "";
  }
}
