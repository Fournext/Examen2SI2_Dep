import { RegisterService } from './../../../services/usuario/register.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { UsuarioRegister } from '../../../interfaces/user.interface';
import { DocenteRegister } from '../../../interfaces/docente.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-registrar-profesor',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalDocenteService = inject(ModalsProfesorService);
  private docenteService = inject(ProfesorService);
  private registerService = inject(RegisterService);
  private toastr = inject(ToastrService);
  //datos
  nombre = signal<string>('');
  apellido = signal<string>('');
  carnet = signal<string>('');
  telefono = signal<string>('');
  turno = signal<string>('');
  fecha_nacimiento = signal<string>('');
  especialidad = signal<string>('');
  fecha_contratacion = signal<string>('');
  usuario = signal<number>(0);

  //usuario
  username = signal<string>('');
  password = signal<string>('');
  email = signal<string>('');
  tipoUsuario = signal<string>('docente');
  estado = 'Activo';

  registrarUsuario(event: Event) {
    event.preventDefault();
    const usuario: UsuarioRegister = {
      username: this.username(),
      password: this.password(),
      email: this.email(),
      tipo_usuario: this.tipoUsuario(),
      estado: this.estado
    }
    console.log(usuario);
    this.registerService.registerUsuario(usuario).subscribe(
      (response: any) => {
        const usaurio = response.usuario;
        this.registrarDocente(usaurio.id);
      }
    )
  }

  registrarDocente(id: number) {
    const docente: DocenteRegister = {
      nombre: this.nombre(),
      apellido: this.apellido(),
      carnet: this.carnet(),
      telefono: this.telefono(),
      turno: this.turno(),
      fecha_nacimiento: this.fecha_nacimiento(),
      especialidad: this.especialidad(),
      fecha_contratacion: this.fecha_contratacion(),
      usuario: id
    }
    console.log(docente);

    this.docenteService.registrarDocente(docente).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModalRegistro();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al crear el usuario';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 1500
        });
      }
    })
  }



  obtenerTurno(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.turno.set(value);
  }

  cerrarModalRegistro() {
    this.modalDocenteService.cambiarEstadoRegistro();
  }
}
