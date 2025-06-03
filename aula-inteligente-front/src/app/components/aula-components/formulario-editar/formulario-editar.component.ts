import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';

@Component({
  selector: 'formulario-editar-aula',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalAulaService = inject(ModalsAulaService);

  cerrarModalEditar() {
    this.modalAulaService.cambiarEstadoEditar();
  }
}
