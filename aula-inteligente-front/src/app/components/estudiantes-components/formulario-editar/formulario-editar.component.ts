import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { GestionService } from '../../../services/gestion/gestion.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { RegisterService } from '../../../services/usuario/register.service';
import { ModalsEstudianteService } from '../../../services/estudiante/modals-estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioRegister } from '../../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { EstudianteRegister } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'formulario-editar-estudiante',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private estudianteService = inject(EstudianteService);
  private gestionService = inject(GestionService);
  private nivelService = inject(NivelService);
  private usuarioRegisterService = inject(RegisterService);
  private modalEstudianteService = inject(ModalsEstudianteService);
  private toastr = inject(ToastrService);



  estudiante = computed(() => this.estudianteService.estudianteActual());
  // Estudiante
  id = signal<number>(this.estudiante().id);
  nombre = signal(this.estudiante().nombre);
  apellido = signal(this.estudiante().apellido);
  carnet_estudiante = signal(this.estudiante().carnet_estudiante);
  fecha_nacimiento = signal(this.estudiante().fecha_nacimiento);
  direccion = signal(this.estudiante().direccion);
  rude = signal(this.estudiante().rude);
  estado = signal<string>(this.estudiante().estado);
  telefono_apoderado = signal(this.estudiante().telefono_apoderado);
  nombre_apoderado = signal(this.estudiante().nombre_apoderado);
  apellido_apoderado = signal(this.estudiante().apellido_apoderado);
  carnet_apoderado = signal(this.estudiante().carnet_apoderado);
  gestion = signal<number>(this.estudiante().gestion);
  nivel = signal<number>(this.estudiante().nivel);
  usuario = signal<number>(this.estudiante().usuario);


  // Listas
  listaGestiones = computed(() => this.gestionService.listaGestion());
  listaNiveles = computed(() => this.nivelService.listaNiveles());



  editarEstudiante(event: Event) {
    event.preventDefault();
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
      usuario: this.usuario()
    };

    console.log(estudiantePayload);

    this.estudianteService.actualiarEstudiante(estudiantePayload, this.id()).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModal();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al actualizar';
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
    this.modalEstudianteService.cambiarEstadoEditar();
  }
}
