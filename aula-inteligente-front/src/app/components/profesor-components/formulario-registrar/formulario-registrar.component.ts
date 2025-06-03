import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';

@Component({
  selector: 'formulario-registrar-profesor',
  imports: [],
  templateUrl: './formulario-registrar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegistrarComponent {
  private modalAdministrativoService = inject(ModalsProfesorService);

  cerrarModalRegistro() {
    this.modalAdministrativoService.cambiarEstadoRegistro();
  }
}
