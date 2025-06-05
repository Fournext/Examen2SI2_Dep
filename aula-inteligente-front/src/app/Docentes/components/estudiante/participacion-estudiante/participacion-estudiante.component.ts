import { DatosGlobalesAulaService } from './../../../../services/datos-aula-docente/datos-globales-aula.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsAparticipacionService } from '../../../../services/participacion/modals-aparticipacion.service';
import { TrimestreService } from '../../../../services/trimestre/trimestre.service';
import { ParticipacionRegister } from '../../../../interfaces/participacion.interface';
import { ParticipacionService } from '../../../../services/participacion/participacion.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-participacion-estudiante',
  imports: [],
  templateUrl: './participacion-estudiante.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipacionEstudianteComponent {
  private participacionModalService = inject(ModalsAparticipacionService);
  private datosGlobalesAulaService = inject(DatosGlobalesAulaService);
  private trimestreService = inject(TrimestreService);
  private participacionService = inject(ParticipacionService);
  private toastr = inject(ToastrService);


  estudianteC = computed(() => this.datosGlobalesAulaService.estudianteActual());
  materiaC = computed(() => this.datosGlobalesAulaService.materia());


  fecha = signal<string>('');
  detalle = signal<string>('');
  trimestre = signal<number>(0);
  estudiante = signal<number>(this.estudianteC().id);
  materia = signal<number>(this.materiaC().id);

  listaTrimestres = computed(() => this.trimestreService.listaTrimestres());

  cerrarModal() {
    this.participacionModalService.cambiarEstadoRegistro();
  }
  obtenerIdTrimestre(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.trimestre.set(+value);
  }

  registrarParticipacion(event: Event) {
    event.preventDefault();
    const participacion: ParticipacionRegister = {
      fecha: this.fecha(),
      detalle: this.detalle(),
      trimestre: this.trimestre(),
      estudiante: this.estudiante(),
      materia: this.materia(),
    }
    console.log(participacion);

    this.participacionService.registrarParticipacion(participacion).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.participacionModalService.cambiarEstadoRegistro();
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
