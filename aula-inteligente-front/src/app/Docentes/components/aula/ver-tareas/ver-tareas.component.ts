import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsTareaService } from '../../../../services/tarea/modals-tarea.service';
import { TareaService } from '../../../../services/tarea/tarea.service';
import { DatosGlobalesAulaService } from '../../../../services/datos-aula-docente/datos-globales-aula.service';
import { Tarea } from '../../../../interfaces/tareas.interface';

@Component({
  selector: 'app-ver-tareas',
  imports: [],
  templateUrl: './ver-tareas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerTareasComponent {
  private listaModalService = inject(ModalsTareaService);
  private tareasService = inject(TareaService);
  private datosGlobalesService = inject(DatosGlobalesAulaService);


  materia = computed(() => this.datosGlobalesService.materia());
  listaTareas = computed(() => {
    const lista = this.tareasService.listaTarea().filter((tarea: Tarea) => tarea.materia == this.materia().id);
    return lista;
  });





  cerrarModal() {
    this.listaModalService.cambiarEstadoLista();
  }
  ngOnInit() {
    this.tareasService.listarTarea();
  }
}
