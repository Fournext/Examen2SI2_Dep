import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';

@Component({
  selector: 'formulario-editar-materia',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalMateriaService = inject(ModalsMateriaService);

  cerrarModal() {
    this.modalMateriaService.cambiarEstadoEditar();
  }
}
