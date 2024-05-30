import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helado } from 'src/app/helados';
import swal from 'sweetalert2';



@Component({
  selector: 'app-crear-helado',
  templateUrl: './crear-helado.component.html',
  styleUrls: ['./crear-helado.component.css']
})
export class CrearHeladoComponent {

  constructor(private forms: FormBuilder,private spinner:NgxSpinnerService)
  {

  }

  public formulario: FormGroup = this.forms.group({
    sabor: ['', [Validators.required,Validators.minLength(1),Validators.pattern('^[a-zA-Z]+$')]],
    tipo: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(1)]],
    peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]],
  }); 

  @Output () emitirAlta: EventEmitter<Helado> = new EventEmitter();



  public darAltaHelado()
  {
    this.spinner.show();

    setTimeout(() => 
    {
      if(this.formulario.valid)
        {
          const helado: Helado = {
            sabor:this.formulario.value["sabor"],
            tipo:this.formulario.value["tipo"],
            peso: this.formulario.value["peso"],
            precio : this.formulario.value["precio"]
          };

          this.emitirAlta.emit(helado);
        }
        else
        {
          swal.fire("Error","Revise sus datos","error");
          this.formulario.markAllAsTouched();
        }
      this.spinner.hide()
    }, 1000);
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

}
