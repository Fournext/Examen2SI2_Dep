import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';

@Component({
  selector: 'aula-item',
  imports: [],
  templateUrl: './aula-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AulaItemComponent {
  private modalAulaService = inject(ModalsAulaService);

  mostrarModal() {
    this.modalAulaService.cambiarEstadoEditar();
  }

  mostrarModalVer() {
    this.modalAulaService.cambiarEstadoVer();
  }
}
