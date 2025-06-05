import { Estudiante } from './../../../../interfaces/estudiante.interface';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsAsistenciaService } from '../../../../services/asistencia/modals-asistencia.service';
import { DatosGlobalesAulaService } from '../../../../services/datos-aula-docente/datos-globales-aula.service';
import { TrimestreService } from '../../../../services/trimestre/trimestre.service';
import { AsistenciaRegister } from '../../../../interfaces/asistencia.interface';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-asistencia',
  imports: [],
  templateUrl: './modal-asistencia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAsistenciaComponent {
  private modalAsistenciaService = inject(ModalsAsistenciaService);
  private datosGlobalesAulaService = inject(DatosGlobalesAulaService);
  private trimestreService = inject(TrimestreService);
  private asistenciaService = inject(AsistenciaService);
  private toastr = inject(ToastrService);


  estudianteC = computed(() => this.datosGlobalesAulaService.estudianteActual());
  materiaC = computed(() => this.datosGlobalesAulaService.materia());
  //datos
  fecha = signal<string>('');
  justificacion = signal<string>('');
  trimestre = signal<number>(0);
  estudiante = signal<number>(this.estudianteC().id);
  materia = signal<number>(this.materiaC().id);



  listaTrimestre = computed(() => this.trimestreService.listaTrimestres());


  cerrarModalRegistro(event: Event) {
    event.preventDefault();
    this.modalAsistenciaService.cambiarEstadoRegistro();
  }

  obtenerIdTrimestre(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.trimestre.set(+value);
  }

  registrarAsistencia(event: Event) {
    event.preventDefault();
    const asistencia: AsistenciaRegister = {
      hora_entrada: this.fecha(),
      justificacion: this.justificacion(),
      trimestre: this.trimestre(),
      estudiante: this.estudiante(),
      materia: this.materia(),
    }
    console.log(asistencia);

    this.asistenciaService.registrarAsistencia(asistencia).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.modalAsistenciaService.cambiarEstadoRegistro();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'No se pudo registrar';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })
  }
  ngOnInit() {
    this.trimestreService.listarTrimestres();
  }
}
