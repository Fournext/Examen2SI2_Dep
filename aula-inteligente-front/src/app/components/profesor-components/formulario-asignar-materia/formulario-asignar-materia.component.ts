import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsAsignacionService } from '../../../services/asignacion-materia/modals-asignacion.service';
import { AsignacionMateriaService } from '../../../services/asignacion-materia/asignacion-materia.service';
import { ProfesorService } from '../../../services/profesor/profesor.service';
import { MateriaService } from '../../../services/materia/materia.service';
import { GestionService } from '../../../services/gestion/gestion.service';
import { AsignacionMateriaRegister } from '../../../interfaces/asignacion-materia.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-asignar-materia',
  imports: [],
  templateUrl: './formulario-asignar-materia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioAsignarMateriaComponent {
  private modalAsignaciones = inject(ModalsAsignacionService);
  private asignacionesServicios = inject(AsignacionMateriaService);
  private docenteService = inject(ProfesorService);
  private materiaService = inject(MateriaService);
  private gestionService = inject(GestionService);
  private toastr = inject(ToastrService);


  //datos
  fecha = signal<string>('');
  materia = signal<number>(0);
  gestion = signal<number>(0);

  listaMateria = computed(() => this.materiaService.listaMateria());
  listaGestion = computed(() => this.gestionService.listaGestion());

  docente = computed(() => this.docenteService.profesorActual());

  obtenerIdMateria(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.materia.set(+value);
  }

  obtenerIdGestion(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.gestion.set(+value);
  }

  registrarAsignacion(event: Event) {
    event.preventDefault();
    const asignacion: AsignacionMateriaRegister = {
      fecha: this.fecha(),
      materia: this.materia(),
      gestion: this.gestion(),
      docente: this.docente().id
    }
    console.log(asignacion);
    this.asignacionesServicios.registrarAsignacionMateria(asignacion).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModalRegistrar();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al crear la asignacion';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 1500
        });
      }
    })

  }

  cerrarModalRegistrar() {
    this.modalAsignaciones.cambiarEstadoRegistro();
  }

  nombreCompleto(): string {
    return (`${this.docente().nombre} ${this.docente().apellido}`);
  }

  ngOnInit() {
    this.materiaService.listarMateria();
    this.gestionService.listarGestiones();
  }



}
