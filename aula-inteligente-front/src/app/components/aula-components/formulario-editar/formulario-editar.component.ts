import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';
import { AulaService } from '../../../services/aula/aula.service';
import { AulaRegister } from '../../../interfaces/aula.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-editar-aula',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalAulaService = inject(ModalsAulaService);
  private aulaService = inject(AulaService);
  private toastr = inject(ToastrService);

  aula = computed(() => this.aulaService.aulaActual());
  id = signal<number>(this.aula().id);
  codigo = signal<string>(this.aula().codigo);
  capacidad = signal<number>(this.aula().capacidad);
  estado = signal<string>(this.aula().estado);

  obtenerEstado(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value);
  }

  actualizarAula(event: Event) {
    event.preventDefault();
    const aula: AulaRegister = {
      codigo: this.codigo(),
      capacidad: this.capacidad(),
      estado: this.estado()
    }
    console.log(aula);
    this.aulaService.actualizarAula(aula, this.id()).subscribe({
      next: (response: any) => {
        this.toastr.success('Acualizado correctamente');
        this.cerrarModalEditar();
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

  cerrarModalEditar() {
    this.modalAulaService.cambiarEstadoEditar();
  }
}
