import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';

@Component({
  selector: 'formulario-editar-profesor',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalProfesorService = inject(ModalsProfesorService);

  cerrarModalEditar() {
    this.modalProfesorService.cambiarEstadoEditar();
  }

}
