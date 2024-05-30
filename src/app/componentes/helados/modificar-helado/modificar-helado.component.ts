import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helado } from 'src/app/helados';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-helado',
  templateUrl: './modificar-helado.component.html',
  styleUrls: ['./modificar-helado.component.css']
})
export class ModificarHeladoComponent {

  constructor(private forms: FormBuilder,private spinner:NgxSpinnerService,public firestore:FirestoreService)
  {

  }

  public formulario: FormGroup = this.forms.group({
    tipo: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(1)]],
    peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]],
  }); 

  @Input() heladoAModificar:Helado | null = null;




  public modificarHelado()
  {
    this.spinner.show();

    setTimeout(async () => 
    {
      if(this.formulario.valid)
        {

          if(this.heladoAModificar != null)
            {
              const helado: Helado = {
                sabor:this.heladoAModificar?.sabor,
                tipo:this.formulario.value["tipo"],
                peso: this.formulario.value["peso"],
                precio : this.formulario.value["precio"]
              };
    
              await this.firestore.editarHelado(helado.sabor,helado.tipo,helado)
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

