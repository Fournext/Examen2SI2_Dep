import { ModalsEstudianteService } from './../../../services/estudiante/modals-estudiante.service';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Estudiante } from '../../../interfaces/estudiante.interface';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';

@Component({
  selector: 'estudiante-item',
  imports: [],
  templateUrl: './estudiante-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstudianteItemComponent {
  private modalEstudianteService = inject(ModalsEstudianteService);
  private estudianteService = inject(EstudianteService);

  estudiante = input.required<Estudiante>();

  mostrarEditar() {
    this.estudianteService.estudianteActual.set(this.estudiante());
    this.modalEstudianteService.cambiarEstadoEditar();
  }

  mostrarVer() {
    this.estudianteService.estudianteActual.set(this.estudiante());
    this.modalEstudianteService.cambiarEstadoVer();

  }
}
