

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Nivel } from '../../../interfaces/nivel.interface';
import { ModalsNivelService } from '../../../services/nivel/modals-nivel.service';
import { NivelService } from '../../../services/nivel/nivel.service';

@Component({
  selector: 'nivel-item',
  imports: [],
  templateUrl: './nivel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NivelItemComponent {
  private modalNivelService = inject(ModalsNivelService);
  private nivelService = inject(NivelService);

  nivel = input.required<Nivel>();

  mostrarEditar() {
    this.nivelService.nivelActual.set(this.nivel());
    this.modalNivelService.cambiarEstadoEditar();
  }

  mostrarVer() {
    this.nivelService.nivelActual.set(this.nivel());
    this.modalNivelService.cambiarEstadoVer();
  }
}
