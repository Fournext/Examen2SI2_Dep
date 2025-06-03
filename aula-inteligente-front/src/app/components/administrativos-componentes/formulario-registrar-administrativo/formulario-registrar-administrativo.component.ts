import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsAdministrativoService } from '../../../services/administrativo/modals-administrativo.service';

@Component({
  selector: 'formulario-registrar-administrativo',
  imports: [],
  templateUrl: './formulario-registrar-administrativo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarAdministrativoComponent {
  private modalAdministrativoService = inject(ModalsAdministrativoService);

  cerrarModalRegistro() {
    this.modalAdministrativoService.cambiarEstadoRegistro();
  }
}
