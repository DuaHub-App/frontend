import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe/equipe.model';
import { environment } from '../../environments/environment';
import { getApiUrl } from '../config/api-config';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  private api = getApiUrl() + "/campeonatos";


  constructor(private http: HttpClient) {}

  getEquipe(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.api}`);
  }

  SalvarEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.api}`, equipe);
  }

  atualizarEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.api}`, equipe);
  }
}
