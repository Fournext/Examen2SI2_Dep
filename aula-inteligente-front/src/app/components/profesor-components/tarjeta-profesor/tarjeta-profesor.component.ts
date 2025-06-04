import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';
import { Docente } from '../../../interfaces/docente.interface';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { ModalsAsignacionService } from '../../../services/asignacion-materia/modals-asignacion.service';

@Component({
  selector: 'tarjeta-profesor',
  imports: [],
  templateUrl: './tarjeta-profesor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaProfesorComponent {
  private modalProfesorService = inject(ModalsProfesorService);
  private profesorService = inject(ProfesorService);
  private asignacionModal = inject(ModalsAsignacionService);

  docente = input.required<Docente>();

  verModalEditar() {
    this.profesorService.profesorActual.set(this.docente());
    this.modalProfesorService.cambiarEstadoEditar();
  }

  asignarModal() {
    this.profesorService.profesorActual.set(this.docente());
    this.asignacionModal.cambiarEstadoRegistro();
  }
}
