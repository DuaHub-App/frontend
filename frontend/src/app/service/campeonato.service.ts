import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Campeonato } from '../models/campeonato/campeonato';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CampeonatoService {
   api = environment.SERVIDOR+"/campeonatos";

  constructor(private http: HttpClient) {}

  // Método para obter todos os campeonatos
  getCampeonatos(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.api}`);
  }

  // Obter campeonato por ID
  // getCampeonato(id: number): Observable<Campeonato> {
  //  return this.http.get<Campeonato>(`${this.api}/${id}`);
  // }

  // Método para salvar um campeonato
  salvarCampeonato(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(`${this.api}`, campeonato);
  }

  // Método para atualizar um campeonato
  atualizarCampeonato(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.api}`, campeonato);
  }

  // Método para excluir um campeonato
  excluirCampeonato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
