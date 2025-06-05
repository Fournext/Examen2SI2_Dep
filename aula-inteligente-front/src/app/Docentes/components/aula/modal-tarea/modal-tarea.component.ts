import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsTareaService } from '../../../../services/tarea/modals-tarea.service';
import { DatosGlobalesAulaService } from '../../../../services/datos-aula-docente/datos-globales-aula.service';
import { TrimestreService } from '../../../../services/trimestre/trimestre.service';
import { TareaService } from '../../../../services/tarea/tarea.service';
import { TareaRegister } from '../../../../interfaces/tareas.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-tarea',
  imports: [],
  templateUrl: './modal-tarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTareaComponent {
  private modalTareaService = inject(ModalsTareaService);
  private datosGlobalesService = inject(DatosGlobalesAulaService);
  private trimestreService = inject(TrimestreService);
  private tareaService = inject(TareaService);
  private toastrService = inject(ToastrService);



  listaEstudiante = computed(() => this.datosGlobalesService.listaEstudiante());
  listaTrimestre = computed(() => this.trimestreService.listaTrimestres());
  materiac = computed(() => this.datosGlobalesService.materia());

  fecha = signal<string>('');
  tipo = signal<string>('');
  descripcion = signal<string>('');
  trimestre = signal<number>(0);
  estudiante = signal<number>(0);
  nota = signal<number>(0);
  materia = signal<number>(this.materiac().id);


  obtenerTipoTarea(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.tipo.set(value);
  }

  obtenerEstudiante(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estudiante.set(+value);
  }

  obtenerTrimestre(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.trimestre.set(+value);
  }

  registrarTarea(event: Event) {
    event.preventDefault();
    const tarea: TareaRegister = {
      fecha: this.fecha(),
      tipo: this.tipo(),
      descripcion: this.descripcion(),
      trimestre: this.trimestre(),
      estudiante: this.estudiante(),
      nota: this.nota(),
      materia: this.materia(),
    }
    console.log(tarea);

    this.tareaService.registrarTarea(tarea).subscribe({
      next: (response: any) => {
        this.toastrService.success(response.message);
        this.modalTareaService.cambiarEstadoRegistro();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'No se pudo registrar';
        this.toastrService.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })
  }

  cerrarModal() {
    this.modalTareaService.cambiarEstadoRegistro();
  }


  ngOnInit() {
    this.trimestreService.listarTrimestres();
  }
}
