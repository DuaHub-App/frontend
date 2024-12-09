import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let loginService = inject(LoginService);

  if (!loginService.hasPermission('ADMIN')) {
    Swal.fire({
      title: 'Você precisa ser um administrador para acessar essa página.',
      icon: 'error',
      confirmButtonText: 'Ok',
    }).then(() => {
      router.navigate(['/home']);
    });
    return false;
  }

  return true;
};
