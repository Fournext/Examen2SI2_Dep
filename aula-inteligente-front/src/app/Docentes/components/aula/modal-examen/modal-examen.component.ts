import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsExamenService } from '../../../../services/examen/modals-examen.service';

@Component({
  selector: 'app-modal-examen',
  imports: [],
  templateUrl: './modal-examen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExamenComponent {
  private modalExamenService = inject(ModalsExamenService);

  cerrarModal() {
    this.modalExamenService.cambiarEstadoRegistro();
  }
}
