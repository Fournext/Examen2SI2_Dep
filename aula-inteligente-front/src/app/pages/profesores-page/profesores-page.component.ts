import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TarjetaProfesorComponent } from "../../components/profesor-components/tarjeta-profesor/tarjeta-profesor.component";
import { ModalsProfesorService } from '../../services/profesor/modals-profesor.service';
import { FormularioEditarComponent } from "../../components/profesor-components/formulario-editar/formulario-editar.component";
import { FormularioRegistrarComponent } from "../../components/profesor-components/formulario-registrar/formulario-registrar.component";
import { ProfesorService } from '../../services/profesor/profesor.service';
import { ModalsAsignacionService } from '../../services/asignacion-materia/modals-asignacion.service';
import { FormularioAsignarMateriaComponent } from "../../components/profesor-components/formulario-asignar-materia/formulario-asignar-materia.component";

@Component({
  selector: 'profesores-page',
  imports: [TarjetaProfesorComponent, FormularioEditarComponent, FormularioRegistrarComponent, FormularioAsignarMateriaComponent],
  templateUrl: './profesores-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfesoresPageComponent {
  private modalProfesorService = inject(ModalsProfesorService);
  private docenteService = inject(ProfesorService);
  private estadoModalAsignarService = inject(ModalsAsignacionService);

  estadoModalEditarProfesor = computed(() => this.modalProfesorService.obtenerEstadoEditar());
  estadoModalRegistrarProfesor = computed(() => this.modalProfesorService.obtenerEstadoRegistro());
  estadoModalAsignar = computed(() => this.estadoModalAsignarService.obtenerEstadoRegistro());

  listaDocente = computed(() => this.docenteService.listaDocente());
  //arreglo de materias luego reemplazar por los datos del servicio
  materias: string[] = ['Matematicas', 'Lenguaje', 'E. Sociales', 'C. Naturales', 'Fisica', 'Quimica', 'E. Fisica'];

  ejecutarAccion(event: Event) {
    let value: string = (event.target as HTMLSelectElement).value;
    console.log(value);

    switch (value) {
      case ('registrar'):
        this.modalProfesorService.cambiarEstadoRegistro();
        break;
      case ('eliminar'):
        console.log(value);
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }
  ngOnInit() {
    this.docenteService.listarDocente();
  }
}
