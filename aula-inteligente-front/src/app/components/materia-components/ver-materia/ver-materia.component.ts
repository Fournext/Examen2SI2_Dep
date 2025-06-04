import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsMateriaService } from '../../../services/materia/modals-materia.service';
import { MateriaService } from '../../../services/materia/materia.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ver-materia',
  imports: [],
  templateUrl: './ver-materia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerMateriaComponent {
  private modalMateriaService = inject(ModalsMateriaService);
  private materiaService = inject(MateriaService);
  private nivelService = inject(NivelService);
  private toastr = inject(ToastrService);

  materia = computed(() => this.materiaService.materiaActual());

  cerrarModal() {
    this.modalMateriaService.cambiarEstadoVer();
  }
}
