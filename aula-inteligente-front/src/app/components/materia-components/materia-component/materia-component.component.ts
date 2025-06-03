import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';

@Component({
  selector: 'materia-component',
  imports: [],
  templateUrl: './materia-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriaComponentComponent {
  private modalMateriaService = inject(ModalsMateriaService);

  mostrarModalEditar() {
    this.modalMateriaService.cambiarEstadoEditar();
  }
}
