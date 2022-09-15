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
