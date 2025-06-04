import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsGestionService } from '../../../services/gestion/modals-gestion.service';
import { GestionService } from '../../../services/gestion/gestion.service';
import { ToastrService } from 'ngx-toastr';
import { GestionRegister } from '../../../interfaces/gestion.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-actualizar-gestion',
  imports: [],
  templateUrl: './formulario-actualizar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioActualizarComponent {
  private modalGestionService = inject(ModalsGestionService);
  private gestionService = inject(GestionService);
  private toastr = inject(ToastrService);


  gestion = computed(() => this.gestionService.gestionActual());
  //datos
  id = signal<number>(this.gestion().id);
  nombre = signal<string>(this.gestion().nombre);
  estado = signal<string>(this.gestion().estado);
  fecha_inicio = signal<string>(this.gestion().fecha_inicio);
  fecha_culminacion = signal<string>(this.gestion().fecha_culminacion);
  asignacion_docente = signal<number[]>(this.gestion().asignacion_docente);
  estudiantes = signal<number[]>(this.gestion().estudiantes);


  actualizarGestion(event: Event) {
    event.preventDefault();
    const gestion: GestionRegister = {
      nombre: this.nombre(),
      estado: this.estado(),
      fecha_inicio: this.fecha_inicio(),
      fecha_culminacion: this.fecha_culminacion()
    }
    console.log(gestion);

    this.gestionService.actualizarGestion(gestion, this.id()).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModalEditar();
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



  obtenerEstado(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value);
  }

  cerrarModalEditar() {
    this.modalGestionService.cambiarEstadoEditar();
  }
}
