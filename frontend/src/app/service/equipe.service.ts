import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe/equipe.model';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  private api = 'http://localhost:8080/equipes';

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
