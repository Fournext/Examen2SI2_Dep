import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsEstudianteService } from '../../services/estudiante/modals-estudiante.service';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { EstudianteItemComponent } from "../../components/estudiantes-components/estudiante-item/estudiante-item.component";
import { FormularioEditarComponent } from "../../components/estudiantes-components/formulario-editar/formulario-editar.component";
import { FormularioRegisterComponent } from "../../components/estudiantes-components/formulario-register/formulario-register.component";
import { VerEstudianteComponent } from "../../components/estudiantes-components/ver-estudiante/ver-estudiante.component";
import { NivelService } from '../../services/nivel/nivel.service';
import { GestionService } from '../../services/gestion/gestion.service';

@Component({
  selector: 'app-estudiante-page',
  imports: [EstudianteItemComponent, FormularioRegisterComponent, VerEstudianteComponent, FormularioEditarComponent],
  templateUrl: './estudiante-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstudiantePageComponent {
  private modalEstudianteService = inject(ModalsEstudianteService);
  private estudianteService = inject(EstudianteService);
  private nivelService = inject(NivelService);
  private gestionService = inject(GestionService);

  estadoModalAulaEditar = computed(() => this.modalEstudianteService.obtenerEstadoEditar());
  estadoModalAulaRegistrar = computed(() => this.modalEstudianteService.obtenerEstadoRegistro());
  estadoModalVer = computed(() => this.modalEstudianteService.obtenerEstadoVer());

  listaEstudiantes = computed(() => this.estudianteService.listaEstudiantes());
  mostrarModalRegistrar(): void {
    this.modalEstudianteService.cambiarEstadoRegistro();
  }

  ejecutarAcciones(event: Event) {
    let value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case ('registrar'):
        this.modalEstudianteService.cambiarEstadoRegistro();
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }

  ngOnInit() {
    this.estudianteService.listarEstudiantes();
    this.nivelService.listarNiveles();
    this.gestionService.listarGestiones();
  }

  listaDeNiveles: string[] = ['1ro Basico', '2do Basico', '3ro Basico', '4to Basico', '5to Basico', '6to Basico'];
}
