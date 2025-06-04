import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';
import { Aula } from '../../../interfaces/aula.interface';
import { AulaService } from '../../../services/aula/aula.service';

@Component({
  selector: 'aula-item',
  imports: [],
  templateUrl: './aula-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AulaItemComponent {
  private modalAulaService = inject(ModalsAulaService);
  private aulaService = inject(AulaService)

  aula = input.required<Aula>();

  mostrarModal() {
    this.aulaService.aulaActual.set(this.aula());
    this.modalAulaService.cambiarEstadoEditar();
  }

  mostrarModalVer() {
    this.aulaService.aulaActual.set(this.aula());
    this.modalAulaService.cambiarEstadoVer();
  }
}
