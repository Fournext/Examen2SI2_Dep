import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { ModalsEstudianteService } from '../../../services/estudiante/modals-estudiante.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ver-estudiante',
  imports: [],
  templateUrl: './ver-estudiante.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerEstudianteComponent {
  private estudianteService = inject(EstudianteService);
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
  gestion = signal<string>(this.estudiante().gestion_nombre);
  nivel = signal<string>(this.estudiante().nivel_nombre);
  usuario = signal<string>(this.estudiante().usuario_username);



  cerrarModal() {
    this.modalEstudianteService.cambiarEstadoVer();
  }
}
