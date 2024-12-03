import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  usuario: string = '';
  senha: string = '';

  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.login.username = this.usuario;
    this.login.password = this.senha;

    // Configuração do Toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        if (token) {
          // Adiciona o token ao localStorage e redireciona para a página de admin
          this.loginService.addToken(token);

          Toast.fire({
            title: 'Acesso Permitido!',
            icon: 'success',
          });

          this.router.navigate(['/admin']);
        } else {
          Swal.fire({
            title: 'Usuário ou senha incorretos!',
            icon: 'error',
          });
        }
      },
      error: (erro) => {
        Swal.fire({
          title: 'Usuário ou senha incorretos!',
          icon: 'error',
        });
      },
    });
  }
}
