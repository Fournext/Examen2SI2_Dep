import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsAulaService } from '../../../services/aula/modals-aula.service';

@Component({
  selector: 'formulario-registrar-aula',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalAulaService = inject(ModalsAulaService);

  cerrarModalRegistro() {
    this.modalAulaService.cambiarEstadoRegistro();
  }
}
