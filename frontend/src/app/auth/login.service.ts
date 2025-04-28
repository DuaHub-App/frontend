import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';
import { getApiUrl } from '../config/api-config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  private API = getApiUrl() + "/login";
  private API_LOGIN = getApiUrl() + "/api/login";



  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API_LOGIN, login, {
      responseType: 'text' as 'json',
    });
  }


  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return '';
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role) return true;
    else return false;
  }
}
