import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/usuario/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    toastr.warning('Debes iniciar sesión para acceder', 'Acceso denegado', {
      positionClass: 'toast-bottom-right',
      timeOut: 1500
    });
    return router.createUrlTree(['/login']);
  }
};
