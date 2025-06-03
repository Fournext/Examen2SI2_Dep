import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioRegister } from '../../../interfaces/user.interface';
import { RegisterService } from '../../../services/usuario/register.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'register-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private router = inject(Router);
  private registerService = inject(RegisterService);
  private toastr = inject(ToastrService);

  username = signal<string>('');
  password = signal<string>('');
  email = signal<string>('');
  tipoUsuario = signal<string>('');
  estado = 'Activo';


  obtenerTipoDeUsuario(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.tipoUsuario.set(value);
  }


  registrarUsuario(event: Event) {
    event.preventDefault();
    const usuario: UsuarioRegister = {
      username: this.username(),
      password: this.password(),
      email: this.email(),
      tipo_usuario: this.tipoUsuario(),
      estado: this.estado,
    }
    console.log(usuario);
    this.registerService.registerUsuario(usuario).subscribe({
      next: (response: any) => {
        this.toastr.success(response.mensaje);
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al crear el usuario';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 1500
        });
      }
    })
    this.router.navigate(['/login']);
  }
}
