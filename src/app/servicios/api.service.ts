import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) 
  { 

  }

  public obtenerInfo(web:string)
  {
    try
    {
      return this.http.get(web);
    }
    catch(error : any)
    {
      return error.code;
    }
  }
}


