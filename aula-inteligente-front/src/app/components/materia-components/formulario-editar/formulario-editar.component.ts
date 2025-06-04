import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';
import { MateriaService } from '../../../services/materia/materia.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { MateriaRegister } from '../../../interfaces/materia.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-editar-materia',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalMateriaService = inject(ModalsMateriaService);
  private materiaService = inject(MateriaService);
  private nivelService = inject(NivelService);
  private toastr = inject(ToastrService);

  materia = computed(() => this.materiaService.materiaActual());

  id = signal<number>(this.materia().id);
  codigo = signal<string>(this.materia().codigo);
  nombre = signal<string>(this.materia().nombre);
  carga_horaria = signal<number>(this.materia().carga_horaria);
  estado = signal<string>(this.materia().estado);
  nivel = signal<number>(this.materia().nivel);
  nivel_descripcion = signal<string>(this.materia().nivel_descripcion);
  temas = signal<number[]>(this.materia().temas);
  asignacion_docente = signal<number[]>(this.materia().asignacion_docente);

  listaNivel = computed(() => this.nivelService.listaNiveles());

  actualizarMateria(event: Event) {
    event.preventDefault();
    const materia: MateriaRegister = {
      codigo: this.codigo(),
      nombre: this.nombre(),
      carga_horaria: this.carga_horaria(),
      estado: this.estado(),
      nivel: this.nivel()
    }
    console.log(materia);
    this.materiaService.actualizarMateria(materia, this.id()).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModal();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'No se pudo Actualizar';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })
  }

  obtenerNivel(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.nivel.set(+value);
  }

  obtenerEstado(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value);
  }

  cerrarModal() {
    this.modalMateriaService.cambiarEstadoEditar();
  }

}
