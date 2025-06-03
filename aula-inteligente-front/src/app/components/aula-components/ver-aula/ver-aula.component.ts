import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';

@Component({
  selector: 'ver-aula',
  imports: [],
  templateUrl: './ver-aula.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerAulaComponent {
  private modalAulaService = inject(ModalsAulaService);

  cerrarModalVer() {
    this.modalAulaService.cambiarEstadoVer();
  }
}
