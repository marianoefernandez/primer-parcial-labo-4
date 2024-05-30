import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public githubInfo : any;

  constructor(private api:ApiService,private router:Router, public autenticador:AutenticacionService, private spinner:NgxSpinnerService,public firestore:FirestoreService)
  {

  }

  async ngOnInit() 
  {
    this.autenticador.usuarioActual = await firstValueFrom(this.autenticador.obtenerUsuarioLogueado());
    if(this.autenticador.usuarioActual != null)
    {
      await this.firestore.obtenerInfoUsuario(this.autenticador.usuarioActual.email);
    }
    const observable = this.api.obtenerInfo("https://api.github.com/users/marianoefernandez");
    this.githubInfo = await firstValueFrom(observable);
    this.reemplazarVacios()
  }

  reemplazarVacios()
  {
    for (const [clave, valor] of Object.entries(this.githubInfo)) 
    {
      if(valor != "0" && (valor == "" || valor == null)) 
      {
        this.githubInfo[clave] = "Sin información"
      }

      if(valor == false)
      {
        this.githubInfo[clave] = "No"
      }
      else
      {
        if(valor == true)
        {
          this.githubInfo[clave] = "Si"
        }
      }

    }
  }

  public cerrarSesion()
  {
    this.spinner.show();

    setTimeout(() => {
      this.autenticador.cerrarSesion()
      this.spinner.hide();
      this.autenticador.usuarioActual = null;
      this.firestore.datosUsuarioActual = null;
    }, 1500);
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

}
