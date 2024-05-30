import { CanActivateFn, Router } from "@angular/router";
import { AutenticacionService } from "../servicios/autenticacion.service";
import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { FirestoreService } from "../servicios/firestore.service";

@Injectable({
  providedIn: 'root'
})

export class esAdminGuard
{
  constructor(private autenticador: AutenticacionService, private firestore:FirestoreService, private router: Router) 
  {
    
  }

  canActivate: CanActivateFn = async (): Promise<boolean> => 
  {
    const observable = this.autenticador.obtenerUsuarioLogueado();
    this.autenticador.usuarioActual = await firstValueFrom(observable);
    await this.firestore.obtenerInfoUsuario(this.autenticador.usuarioActual.email);
    
    if(this.firestore.datosUsuarioActual.tipoUsuario == "admin")
    {
      return true;
    }

    this.router.navigateByUrl("principal/home");
    return false;
  };
}