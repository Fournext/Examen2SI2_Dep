import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';
import { AulaService } from '../../../services/aula/aula.service';
import { ToastrService } from 'ngx-toastr';
import { AulaRegister } from '../../../interfaces/aula.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-registrar-aula',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalAulaService = inject(ModalsAulaService);
  private aulaService = inject(AulaService);
  private toastr = inject(ToastrService);

  codigo = signal<string>('');
  capacidad = signal<number>(0);
  estado = signal<string>('');

  obtenerEstado(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value);
  }

  registrarAula(event: Event) {
    event.preventDefault();
    const aula: AulaRegister = {
      codigo: this.codigo(),
      capacidad: this.capacidad(),
      estado: this.estado()
    }
    console.log(aula);
    this.aulaService.registrarAula(aula).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModalRegistro();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'No se pudo registrar';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })
  }

  cerrarModalRegistro() {
    this.modalAulaService.cambiarEstadoRegistro();
  }
}
