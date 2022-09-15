import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';

const API_PRODUCTOS_URL = `${environment.apiUrl}/productos`;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Producto> {
    return this.http.get<Producto>(`${API_PRODUCTOS_URL}`);
  }

  traerProducto(id:string): Observable<Producto> {
    return this.http.get<any>(`${API_PRODUCTOS_URL}/${id}`).pipe(
      map((producto: Producto) => {
        console.log(producto);
        return producto;
      })
    );
  }

  registrarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${API_PRODUCTOS_URL}`, producto);
  }

  actualizarProducto(id:string, producto: Producto): Observable<Producto> {
    return this.http.patch<Producto>(`${API_PRODUCTOS_URL}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${API_PRODUCTOS_URL}/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

}
