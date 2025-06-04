import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MateriaComponentComponent } from "../../components/materia-components/materia-component/materia-component.component";
import { ModalsMateriaService } from '../../services/materia/modals-materia.service';
import { FormularioEditarComponent } from "../../components/materia-components/formulario-editar/formulario-editar.component";
import { FormularioRegistrarComponent } from "../../components/materia-components/formulario-registrar/formulario-registrar.component";
import { VerMateriaComponent } from "../../components/materia-components/ver-materia/ver-materia.component";
import { MateriaService } from '../../services/materia/materia.service';
import { ToastrService } from 'ngx-toastr';
import { NivelService } from '../../services/nivel/nivel.service';

@Component({
  selector: 'materia-page',
  imports: [MateriaComponentComponent, FormularioEditarComponent, FormularioRegistrarComponent, VerMateriaComponent],
  templateUrl: './materia-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriaPageComponent {
  private modalMateriaService = inject(ModalsMateriaService);
  private materiaService = inject(MateriaService);
  private nivelService = inject(NivelService);
  private toastr = inject(ToastrService);

  estadoModalAulaEditar = computed(() => this.modalMateriaService.obtenerEstadoEditar());
  estadoModalAulaRegistrar = computed(() => this.modalMateriaService.obtenerEstadoRegistro());
  estadoModalVer = computed(() => this.modalMateriaService.obtenerEstadoVer());


  listaMateria = computed(() => this.materiaService.listaMateria());



  mostrarModalRegistrar(): void {
    this.modalMateriaService.cambiarEstadoRegistro();
  }


  ejecutarAccion(event: Event): void {
    let value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case ('registrar'):
        this.modalMateriaService.cambiarEstadoRegistro();
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }

  ngOnInit() {
    this.materiaService.listarMateria();
    this.nivelService.listarNiveles();
  }
}
