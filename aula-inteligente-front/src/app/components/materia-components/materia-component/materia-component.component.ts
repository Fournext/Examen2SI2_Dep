import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';
import { Materia } from '../../../interfaces/materia.interface';
import { MateriaService } from '../../../services/materia/materia.service';

@Component({
  selector: 'materia-component',
  imports: [],
  templateUrl: './materia-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriaComponentComponent {
  private modalMateriaService = inject(ModalsMateriaService);
  private materiaService = inject(MateriaService);

  materia = input.required<Materia>();

  mostrarModalEditar() {
    this.materiaService.materiaActual.set(this.materia());
    this.modalMateriaService.cambiarEstadoEditar();
  }

  mostrarModalVer() {
    this.materiaService.materiaActual.set(this.materia());
    this.modalMateriaService.cambiarEstadoVer();
  }
}
