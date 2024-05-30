import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where,getDocs, onSnapshot, updateDoc, doc} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repartidor } from '../interfaces/repartidor';
import { usuario } from '../usuarios';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService{

  constructor(private firestore: Firestore) { }

  private repartidores = collection(this.firestore,"repartidores");
  private usuarios = collection(this.firestore,"usuarios");
  public datosUsuarioActual : any | null = null;

  agregarRepartidor(repartidor:Repartidor)
  {
    try
    {
      return addDoc(this.repartidores,repartidor);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  obtenerRepartidores(): Observable<Repartidor[]> {
    return new Observable<Repartidor[]>((observable) => {
      onSnapshot(this.repartidores, (snap) => {
        const repartidores: Repartidor[] = [];
        snap.docChanges().forEach(x => {
          const rep = x.doc.data() as Repartidor;
          repartidores.push(rep);
        });
        observable.next(repartidores);
      });
    });
  }

  async obtenerInfoUsuario(email:string)
  {
    try
    {
      const consulta = query(this.usuarios, where("email", "==", email));
      const consultaEjecuto = await getDocs(consulta);
      let datos = false;
      consultaEjecuto.forEach((datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        this.datosUsuarioActual = datos.data();
        return true;
      });   
      return false;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

}