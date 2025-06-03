import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';

@Component({
  selector: 'formulario-registrar-materia',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalMateriaService = inject(ModalsMateriaService);

  cerrarModal() {
    this.modalMateriaService.cambiarEstadoRegistro();
  }
}
