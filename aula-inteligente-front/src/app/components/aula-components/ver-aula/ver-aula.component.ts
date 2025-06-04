import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';
import { AulaService } from '../../../services/aula/aula.service';

@Component({
  selector: 'ver-aula',
  imports: [],
  templateUrl: './ver-aula.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerAulaComponent {
  private modalAulaService = inject(ModalsAulaService);
  private aulaService = inject(AulaService);

  aula = computed(() => this.aulaService.aulaActual());

  cerrarModalVer() {
    this.modalAulaService.cambiarEstadoVer();
  }
}
