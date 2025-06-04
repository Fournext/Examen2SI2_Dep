import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { DocenteRegister } from '../../../interfaces/docente.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-editar-profesor',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalDocenteService = inject(ModalsProfesorService);
  private docenteService = inject(ProfesorService);
  private toastr = inject(ToastrService);


  docente = computed(() => this.docenteService.profesorActual());
  //datos
  id = signal<number>(this.docente().id);
  nombre = signal<string>(this.docente().nombre);
  apellido = signal<string>(this.docente().apellido);
  carnet = signal<string>(this.docente().carnet);
  telefono = signal<string>(this.docente().telefono);
  turno = signal<string>(this.docente().turno);
  fecha_nacimiento = signal<string>(this.docente().fecha_nacimiento);
  especialidad = signal<string>(this.docente().especialidad);
  fecha_contratacion = signal<string>(this.docente().fecha_contratacion);
  usuario = signal<number>(this.docente().usuario);
  usuario_username = signal<string>(this.docente().usuario_username);


  actualizarDocente(event: Event) {
    event.preventDefault();
    const docente: DocenteRegister = {
      nombre: this.nombre(),
      apellido: this.apellido(),
      carnet: this.carnet(),
      telefono: this.telefono(),
      turno: this.turno(),
      fecha_nacimiento: this.fecha_nacimiento(),
      especialidad: this.especialidad(),
      fecha_contratacion: this.fecha_contratacion(),
      usuario: this.usuario(),
    }
    console.log(docente);

    this.docenteService.actualizarDocente(docente, this.id()).subscribe({
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



  obtenerTurno(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.turno.set(value);
  }

  cerrarModalEditar() {
    this.modalDocenteService.cambiarEstadoEditar();
  }

}
