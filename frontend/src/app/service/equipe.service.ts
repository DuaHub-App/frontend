import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe } from '../models/equipe/equipe.model';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  private api = 'http://localhost:3306';

  constructor(private http: HttpClient) {}

  getEquipe(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.api}/equipes/`);
  }

  SalvarEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.api}/equipes/`, equipe);
}
}
