import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsAdministrativoService } from '../../../services/administrativo/modals-administrativo.service';

@Component({
  selector: 'formulario-editar-administrativo',
  imports: [],
  templateUrl: './formulario-editar-administrativo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarAdministrativoComponent {
  private modalAdministrativoService = inject(ModalsAdministrativoService);

  cerrarModalEditar() {
    this.modalAdministrativoService.cambiarEstadoEditar();
  }
}
