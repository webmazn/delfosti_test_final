import { Inject, OnDestroy, Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';

const API_PRODUCTOS_URL = `${environment.apiUrl}/productos`;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Producto> {
    return this.http.get<Producto>(`${API_PRODUCTOS_URL}`);
  }

}

  // carrito: any = []

  // constructor(private http: HttpClient) { }

  // getProductos(): Observable <any>{
  //   return this.http.get(`${this.API_URI}/productos`);
  // }

  // setCarrito(carrito: any){
  //   console.log('enviamos el carrito');
  //   this.carrito = carrito;
  //   console.log(this.carrito);
  // }

  // getCarrito(){
  //   console.log('traemos el carrito');
  //   console.log(this.carrito);
  // }
