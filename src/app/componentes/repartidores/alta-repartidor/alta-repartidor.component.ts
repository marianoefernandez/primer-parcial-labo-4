import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Repartidor } from 'src/app/interfaces/repartidor';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-alta-repartidor',
  templateUrl: './alta-repartidor.component.html',
  styleUrls: ['./alta-repartidor.component.css']
})
export class AltaRepartidorComponent 
{

  public listaPaisesFlag:boolean = true;
  public paisElegido:any;
  public paisElegidoNombre:string = "";
  public nombre : string = "";
  public dni : number = 0;
  public edad : number = 0;
  public cantidadUnidades : number = 0;
  public esUnidadPropia : boolean = false;
  public listaRepartidores : Repartidor[] = [];
  public suscripcion!: Subscription;

  public formulario: FormGroup = this.forms.group({
    nombre: ['', [Validators.required,Validators.minLength(1),Validators.pattern('^[a-zA-Z]+$')]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
    cantidadUnidades: ['', [Validators.required, Validators.min(1)]],
    paisElegido: [''],
    esUnidadPropia: ['', [Validators.required]],
  }); 
  constructor(private firestore:FirestoreService, private forms: FormBuilder, private spinner:NgxSpinnerService)
  {

  }

  ngOnInit()
  {
    this.suscripcion = this.firestore.obtenerRepartidores().subscribe(repartidores=>
      {
        for(let i = 0;i<repartidores.length;i++)
        {
          this.listaRepartidores.push(repartidores[i])
        }
      })
  }

  public activarListaPaises()
  {
    this.listaPaisesFlag = !this.listaPaisesFlag
  }

  public seleccionarPais(pais:string)
  {
    this.paisElegido = pais;
    this.paisElegidoNombre = this.paisElegido["name"]["common"];
    this.formulario.value["paisElegido"] = this.paisElegido;
    this.activarListaPaises();
  }

  public validarPais()
  {
    if(this.paisElegidoNombre == "" && this.formulario.touched)
    {
      return "Este campo es requerido";
    }

    return "";
  }

  public verificarSiExiste()
  {
    for(let i = 0;i<this.listaRepartidores.length;i++)
    {
      if(this.formulario.value['dni'] == this.listaRepartidores[i]["dni"])
      {
        return true;
      }
    }

    return false;
  }
  
  verificarError(campo: string): boolean | null 
  {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  obtenerError(campo: string): string | null {
    if (!this.formulario.controls[campo] && !this.formulario.controls[campo].errors) return null;

    const errores = this.formulario.controls[campo].errors;

    for (const clave of Object.keys(errores!)) 
    {
      switch (clave) 
      {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Minimo ${errores!['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errores!['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errores!['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errores!['max'].max}.`;
        case 'email':
          return "El formato del mail es incorrecto";
        case 'pattern':
          return `El formato del ${campo} es incorrecto`;
      }
    }
    return null;
  }

  public darAltaRepartidor()
  {
    this.spinner.show();
    this.formulario.value["paisElegido"] = this.paisElegido;

    setTimeout(() => 
    {
      if(this.formulario.valid && this.paisElegidoNombre != "")
        {
          if(this.verificarSiExiste())
          {
            swal.fire("Error","Ya existe un repartidor con ese dni","error");
          }
          else
          {
            const repartidor: Repartidor = {
              nombre: this.formulario.value["nombre"],
              dni: parseInt(this.formulario.value["dni"]),
              edad: parseInt(this.formulario.value["edad"]),
              paisElegido: this.formulario.value["paisElegido"],
              cantidadUnidades: parseInt(this.formulario.value["cantidadUnidades"]),
              esUnidadPropia: this.formulario.value["esUnidadPropia"]
            };
    
            swal.fire("Agregado","Repartidor agregado con exito","success");
            this.firestore.agregarRepartidor(repartidor);
          }
    
        }
        else
        {
          swal.fire("Error","Revise sus datos","error");
          this.formulario.markAllAsTouched();
        }
      this.spinner.hide()
    }, 1000);
  }
}
