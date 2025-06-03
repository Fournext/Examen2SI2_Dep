import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/usuario/login.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogin } from '../../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/usuario/auth.service';

@Component({
  selector: 'login-page',
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  //datos
  username = signal<string>('');
  password = signal<string>('');


  iniciarSesion(event: Event) {
    event.preventDefault();
    const usuario: UsuarioLogin = {
      username: this.username(),
      password: this.password()
    }

    //implementar la direccionamiento de los profesores
    this.loginService.login(usuario).subscribe({
      next: (response: any) => {
        const token = response.token;
        if (token) {
          this.authService.saveToken(token);
          this.router.navigate(['/private']);
          this.toastr.success("!Bienvenido!", "Exitoso");
          console.log('entro');
        } else {
          this.toastr.error("No se recibió el token", "Error");
        }
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al iniciar sesión';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })
  }



}
