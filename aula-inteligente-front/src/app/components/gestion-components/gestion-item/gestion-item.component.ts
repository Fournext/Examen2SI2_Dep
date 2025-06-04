import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Gestion } from '../../../interfaces/gestion.interface';
import { ModalsGestionService } from '../../../services/gestion/modals-gestion.service';
import { GestionService } from '../../../services/gestion/gestion.service';

@Component({
  selector: 'gestion-item',
  imports: [],
  templateUrl: './gestion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionItemComponent {
  private modalGestionService = inject(ModalsGestionService);
  private gestionService = inject(GestionService);

  gestion = input.required<Gestion>();

  mostrarModalEditar() {
    this.gestionService.gestionActual.set(this.gestion());
    this.modalGestionService.cambiarEstadoEditar();
  }

  mostrarModalVer() {

  }
}
