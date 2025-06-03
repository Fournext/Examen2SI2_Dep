import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/usuario/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const allowedRoles = route.data['roles'] as string[];

  if (!authService.isAuthenticated()) {
    toastr.warning('Debes iniciar sesión para acceder', 'Acceso denegado', {
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    });
    return router.createUrlTree(['/login']);
  }

  const userRole = authService.getRole();

  if (allowedRoles.includes(userRole!)) {
    return true;
  } else {
    toastr.error('No tienes permiso para acceder a esta sección', 'Acceso denegado', {
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    });
    return router.createUrlTree(['/home']); // o redirigir a '/home'
  }
};
