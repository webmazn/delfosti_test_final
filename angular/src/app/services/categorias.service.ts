import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';

const API_CATEGORIAS_URL = `${environment.apiUrl}/categorias`;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria> {
    return this.http.get<Categoria>(`${API_CATEGORIAS_URL}`);
  }

}
