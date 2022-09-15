import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Marca } from '../models/marca.model';
import { HttpClient } from '@angular/common/http';

const API_MARCAS_URL = `${environment.apiUrl}/marcas`;

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Marca> {
    return this.http.get<Marca>(`${API_MARCAS_URL}`);
  }

}
