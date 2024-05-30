import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where,getDocs, onSnapshot, updateDoc, doc,deleteDoc} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repartidor } from '../interfaces/repartidor';
import { usuario } from '../usuarios';
import { Helado } from '../helados';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService{

  constructor(private firestore: Firestore) { }

  private repartidores = collection(this.firestore,"repartidores");
  private usuarios = collection(this.firestore,"usuarios");
  private helados = collection(this.firestore,"helados");
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

  agregarHelado(helado:Helado)
  {
    try
    {
      return addDoc(this.helados,helado);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async editarHelado(sabor:string,tipo:string,dato:any)
  {
    try
    {
      const consulta = query(this.helados, where("sabor", "==", sabor));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        const datosHelado = datos.data();
        if(datosHelado["tipo"] == tipo)
        {
          updateDoc(doc(this.firestore,"helados",id),dato)
        }
      });   
      return true;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async eliminarHelado(sabor:string,tipo:string)
  {
    try
    {
      const consulta = query(this.helados, where("sabor", "==", sabor));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        const datosHelado = datos.data();
        if(datosHelado["tipo"] == tipo)
        {
          console.log()
          await deleteDoc(doc(this.firestore,"helados",id));
        }
        //await updateDoc(doc(this.firestore,"turnos",id),dato)
      });   
      return true;
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

  obtenerHelados(): Observable<Helado[]> {
    return new Observable<Helado[]>((observable) => {
      onSnapshot(this.helados, (snap) => {
        const helados: Helado[] = [];
        snap.docChanges().forEach(x => {
          const rep = x.doc.data() as Helado;
          helados.push(rep);
        });
        observable.next(helados);
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