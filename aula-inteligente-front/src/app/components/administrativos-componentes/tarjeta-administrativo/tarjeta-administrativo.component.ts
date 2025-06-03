import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsAdministrativoService } from '../../../services/administrativo/modals-administrativo.service';

@Component({
  selector: 'tarjeta-administrativo',
  imports: [],
  templateUrl: './tarjeta-administrativo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaAdministrativoComponent {
  private modalAdministrativoService = inject(ModalsAdministrativoService);

  verModalEditar() {
    this.modalAdministrativoService.cambiarEstadoEditar();
  }
}
