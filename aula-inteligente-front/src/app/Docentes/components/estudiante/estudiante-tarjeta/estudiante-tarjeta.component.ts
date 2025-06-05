import { ModalAsistenciaComponent } from './../modal-asistencia/modal-asistencia.component';
import { Nivel } from './../../../../interfaces/nivel.interface';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Estudiante } from '../../../../interfaces/estudiante.interface';
import { TrimestreService } from '../../../../services/trimestre/trimestre.service';
import { DatosGlobalesAulaService } from '../../../../services/datos-aula-docente/datos-globales-aula.service';
import { ModalsAsistenciaService } from '../../../../services/asistencia/modals-asistencia.service';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { ModalsAparticipacionService } from '../../../../services/participacion/modals-aparticipacion.service';
import { ParticipacionEstudianteComponent } from "../participacion-estudiante/participacion-estudiante.component";

@Component({
  selector: 'estudiante-tarjeta',
  imports: [ModalAsistenciaComponent, ParticipacionEstudianteComponent],
  templateUrl: './estudiante-tarjeta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstudianteTarjetaComponent {
  private trimestreService = inject(TrimestreService);
  private datosGlobalesService = inject(DatosGlobalesAulaService);
  private modalAsistenciaService = inject(ModalsAsistenciaService);
  private estudianteService = inject(EstudianteService);
  private participacionModalService = inject(ModalsAparticipacionService);


  estudiante = input.required<Estudiante>();
  listaTrimestre = computed(() => this.trimestreService.listaTrimestres());
  materia = computed(() => this.datosGlobalesService.materia());

  mostrarModal = computed(() => this.modalAsistenciaService.obtenerEstadoRegistro());
  mostrarModalParticipacion = computed(() => this.participacionModalService.obtenerEstadoRegistro());

  verModalRegistro() {
    this.datosGlobalesService.estudianteActual.set(this.estudiante());
    this.modalAsistenciaService.cambiarEstadoRegistro();
  }

  verModalRegistroParticipacion() {
    this.datosGlobalesService.estudianteActual.set(this.estudiante());
    this.participacionModalService.cambiarEstadoRegistro();
  }




  ngOnInit() {
    this.trimestreService.listarTrimestres();
  }
}
