import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { ModalsEstudianteService } from '../../../services/estudiante/modals-estudiante.service';
import { GestionService } from '../../../services/gestion/gestion.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { UsuarioRegister } from '../../../interfaces/user.interface';
import { RegisterService } from '../../../services/usuario/register.service';
import { Estudiante, EstudianteRegister } from '../../../interfaces/estudiante.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-register-estudiante',
  imports: [],
  templateUrl: './formulario-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegisterComponent {
  private estudianteService = inject(EstudianteService);
  private gestionService = inject(GestionService);
  private nivelService = inject(NivelService);
  private usuarioRegisterService = inject(RegisterService);
  private modalEstudianteService = inject(ModalsEstudianteService);
  private toastr = inject(ToastrService);

  // Estudiante
  nombre = signal('');
  apellido = signal('');
  carnet_estudiante = signal('');
  fecha_nacimiento = signal('');
  direccion = signal('');
  rude = signal('');
  telefono_apoderado = signal('');
  nombre_apoderado = signal('');
  apellido_apoderado = signal('');
  carnet_apoderado = signal('');
  gestion = signal<number>(0);
  nivel = signal<number>(0);
  usuario = signal<number>(0);

  // Usuario
  username = signal('');
  password = signal('');
  email = signal('');
  tipo_usuario = signal('estudiante'); // fijo
  estado = signal('activo'); // fijo

  // Listas
  listaGestiones = computed(() => this.gestionService.listaGestion());
  listaNiveles = computed(() => this.nivelService.listaNiveles());

  registrarUsuarioYEstudiante(event: Event) {
    event.preventDefault();

    const usuarioPayload: UsuarioRegister = {
      username: this.username(),
      password: this.password(),
      email: this.email(),
      tipo_usuario: this.tipo_usuario(),
      estado: this.estado(),
    };
    console.log(usuarioPayload);

    this.usuarioRegisterService.registerUsuario(usuarioPayload).subscribe({
      next: (response: any) => {
        const usuario = response.usuario;
        this.registrarEstudiante(usuario.id);
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

  registrarEstudiante(id: number) {
    const estudiantePayload: EstudianteRegister = {
      nombre: this.nombre(),
      apellido: this.apellido(),
      carnet_estudiante: this.carnet_estudiante(),
      fecha_nacimiento: this.fecha_nacimiento(),
      direccion: this.direccion(),
      rude: this.rude(),
      estado: this.estado(),
      telefono_apoderado: this.telefono_apoderado(),
      nombre_apoderado: this.nombre_apoderado(),
      apellido_apoderado: this.apellido_apoderado(),
      carnet_apoderado: this.carnet_apoderado(),
      gestion: Number(this.gestion()),
      nivel: Number(this.nivel()),
      usuario: id
    };

    console.log(estudiantePayload);

    this.estudianteService.registrarEstudiante(estudiantePayload).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModal();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al crear el estudiante';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 1500
        });
      }
    })

  }

  obtenerGestion(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.gestion.set(+value);
  }

  obtenerNivel(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.nivel.set(+value);
  }

  cerrarModal() {
    this.modalEstudianteService.cambiarEstadoRegistro();
  }
}
