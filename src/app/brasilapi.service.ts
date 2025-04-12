import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Estado, Municipio} from './brasilapi.models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  baseurl = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  listarUfs(): Observable<Estado[]>{
    const path = '/ibge/uf/v1'
    return this.http.get<Estado[]>(`${this.baseurl}`+ path);
  }

  listarMunicipios(ufSelecionada: any): Observable<Municipio[]>{
    const path = `/ibge/municipios/v1/${ufSelecionada}`
    return this.http.get<Municipio[]>(`${this.baseurl}`+ path);

  }
}
