import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar() {
    const usuariosValidos = [
      { usuario: 'admin', senha: 'admin' },
      { usuario: 'hoesel', senha: 'hoesel' },
      { usuario: 'ribeiro', senha: 'ribeiro' },
      { usuario: 'tchola', senha: 'tchola' },
    ];

    const credencialValida = usuariosValidos.some(
      (credencial) =>
        credencial.usuario === this.usuario && credencial.senha === this.senha
    );

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    if (credencialValida) {
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
  }
}
