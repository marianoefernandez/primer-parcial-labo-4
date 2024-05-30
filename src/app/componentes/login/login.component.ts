import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import {NgxSpinnerService} from 'ngx-spinner'
import { firstValueFrom } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public nombreUsuario : string = "";
  public email : string = "";
  public clave : string = "";
  public mensajeError : string = "";

  constructor(private router:Router,private autenticador:AutenticacionService, private spinner:NgxSpinnerService, private firestore:FirestoreService)
  {

  }


  public loguearse()
  {
    this.spinner.show()  
    this.autenticador.login(this.email,this.clave).then(respuesta => {
      setTimeout(async () =>{

        if(typeof respuesta != "string")
        {
          const observable = this.autenticador.obtenerUsuarioLogueado();
          this.autenticador.usuarioActual = await firstValueFrom(observable);
          await this.firestore.obtenerInfoUsuario(this.autenticador.usuarioActual.email);
          this.navigate("principal/home");
        }
        else
        {
          this.mostrarError(respuesta);
        }
        this.spinner.hide();
      },500)
    })
  }

  public accesoRapido(email:string,clave:string)
  {
    this.email = email;
    this.clave = clave;
  }

  public mostrarError(error:string)
  {
    switch(error)
    {
      case "auth/invalid-email":
        this.mensajeError = 'El formato de correo es invalido';
        break;
      case "auth/operation-not-allowed":
        this.mensajeError = "Operación no permitida"
        break;
      default:
        this.mensajeError = 'El usuario o contraseña no son correctos. Por favor verifique los datos.'
    }

    if (this.email == "" || this.clave == "")
    {
      this.mensajeError = "El campo email o contraseña están vacios por favor ingrese sus datos";
    }

    if (this.email == "")
    {
      this.mensajeError = "El campo email está vació. Por favor ingrese su mail";
    }
  }

  /*
  public async cargando(segundos:number)
  {
    this.spinner.show();
    setTimeout(()=>
    {
      this.spinner.hide();
    },segundos)
  }
  */
  
  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
 