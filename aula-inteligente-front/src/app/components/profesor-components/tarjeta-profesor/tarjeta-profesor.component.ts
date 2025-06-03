import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalsProfesorService } from '../../../services/profesor/modals-profesor.service';

@Component({
  selector: 'tarjeta-profesor',
  imports: [],
  templateUrl: './tarjeta-profesor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaProfesorComponent {
  private modalProfesorService = inject(ModalsProfesorService);

  verModalEditar() {
    this.modalProfesorService.cambiarEstadoEditar();
  }
}
