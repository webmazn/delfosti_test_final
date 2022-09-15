import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';

const API_CATEGORIAS_URL = `${environment.apiUrl}/categorias`;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<Categoria> {
    return this.http.get<Categoria>(`${API_CATEGORIAS_URL}`).pipe(
      map((categoria: Categoria) => {
        console.log(categoria);
        return categoria;
      })
    );
  }

}
