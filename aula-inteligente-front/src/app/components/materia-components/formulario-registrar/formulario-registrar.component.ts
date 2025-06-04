import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';
import { MateriaService } from '../../../services/materia/materia.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { ToastrService } from 'ngx-toastr';
import { MateriaRegister } from '../../../interfaces/materia.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-registrar-materia',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalMateriaService = inject(ModalsMateriaService);
  private materiaService = inject(MateriaService);
  private nivelService = inject(NivelService);
  private toastr = inject(ToastrService);


  codigo = signal<string>('');
  nombre = signal<string>('');
  carga_horaria = signal<number>(0.0);
  estado = signal<string>('');
  nivel = signal<number>(0);
  nivel_descripcion = signal<string>('');

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
    this.materiaService.registrarMateria(materia).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModal();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'No se pudo Registrar';
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
    this.modalMateriaService.cambiarEstadoRegistro();
  }
}
