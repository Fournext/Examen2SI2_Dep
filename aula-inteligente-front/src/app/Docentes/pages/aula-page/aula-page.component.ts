import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AsignacionMateria } from '../../../interfaces/asignacion-materia.interface';
import { Materia } from '../../../interfaces/materia.interface';
import { Nivel } from '../../../interfaces/nivel.interface';
import { EstudianteTarjetaComponent } from "../../components/estudiante/estudiante-tarjeta/estudiante-tarjeta.component";
import { DatosGlobalesAulaService } from '../../../services/datos-aula-docente/datos-globales-aula.service';
import { TrimestreService } from '../../../services/trimestre/trimestre.service';
import { ModalsTareaService } from '../../../services/tarea/modals-tarea.service';
import { ModalTareaComponent } from "../../components/aula/modal-tarea/modal-tarea.component";
import { ModalsExamenService } from '../../../services/examen/modals-examen.service';
import { ModalExamenComponent } from "../../components/aula/modal-examen/modal-examen.component";
import { VerTareasComponent } from "../../components/aula/ver-tareas/ver-tareas.component";

@Component({
  selector: 'aula-page-estudiante',
  imports: [EstudianteTarjetaComponent, ModalTareaComponent, ModalExamenComponent, VerTareasComponent],
  templateUrl: './aula-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AulaPageComponent {
  private datosGlobalesServices = inject(DatosGlobalesAulaService);
  private trimestreSerive = inject(TrimestreService);
  private modalTareaService = inject(ModalsTareaService);
  private modalExamenService = inject(ModalsExamenService);

  listaEstudiantes = computed(() => this.datosGlobalesServices.listaEstudiante());

  modalRegistrar = computed(() => this.modalTareaService.obtenerEstadoRegistro());
  modalRegistrarExamen = computed(() => this.modalExamenService.obtenerEstadoRegistro());

  modalListaTarea = computed(() => this.modalTareaService.obtenerEstadolista());

  mostrarModalTareaRegister() {
    this.datosGlobalesServices.listaEstudiante.set(this.listaEstudiantes());
    this.modalTareaService.cambiarEstadoRegistro();
  }

  mostrarModalLista() {
    this.modalTareaService.cambiarEstadoLista();
  }


  ngOnInit() {
    this.trimestreSerive.listarTrimestres();
  }

  acciones(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case 'tarea':
        this.mostrarModalTareaRegister();
        break;
      case 'examen':
        this.modalExamenService.cambiarEstadoRegistro();
        break;
      default:
        console.log('accion no encontrada');
    }
  }

  acciones2(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case 'tarea':
        this.mostrarModalLista();
        break;
      case 'examen':

        break;
      default:
        console.log('accion no encontrada');
    }
  }

}
