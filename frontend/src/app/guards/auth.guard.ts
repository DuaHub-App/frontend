import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Exemplo: verifica um token no localStorage
    if (!isLoggedIn) {
      Swal.fire({ 
        icon: 'error',
        title: 'Acesso negado',
        text: 'Você precisa estar logado para acessar esta página',
      });
      this.router.navigate(['/login']); // Redireciona para a página de login, caso não esteja logado
      return false;
    }
    return true;
  }
}
