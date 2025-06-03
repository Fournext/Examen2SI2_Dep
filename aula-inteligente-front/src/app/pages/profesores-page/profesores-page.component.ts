import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TarjetaProfesorComponent } from "../../components/profesor-components/tarjeta-profesor/tarjeta-profesor.component";
import { ModalsProfesorService } from '../../services/profesor/modals-profesor.service';
import { FormularioEditarComponent } from "../../components/profesor-components/formulario-editar/formulario-editar.component";
import { FormularioRegistrarComponent } from "../../components/profesor-components/formulario-registrar/formulario-registrar.component";

@Component({
  selector: 'profesores-page',
  imports: [TarjetaProfesorComponent, FormularioEditarComponent, FormularioRegistrarComponent],
  templateUrl: './profesores-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfesoresPageComponent {
  private modalProfesorService = inject(ModalsProfesorService);

  estadoModalEditarProfesor = computed(() => this.modalProfesorService.obtenerEstadoEditar());
  estadoModalRegistrarProfesor = computed(() => this.modalProfesorService.obtenerEstadoRegistro());

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
}
