import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsGestionService } from '../../services/gestion/modals-gestion.service';
import { GestionService } from '../../services/gestion/gestion.service';
import { ToastrService } from 'ngx-toastr';
import { GestionItemComponent } from "../../components/gestion-components/gestion-item/gestion-item.component";
import { FormularioActualizarComponent } from "../../components/gestion-components/formulario-actualizar/formulario-actualizar.component";
import { FormularioRegisterComponent } from "../../components/gestion-components/formulario-register/formulario-register.component";
import { NivelService } from '../../services/nivel/nivel.service';

@Component({
  selector: 'app-gestion-page',
  imports: [GestionItemComponent, FormularioActualizarComponent, FormularioRegisterComponent],
  templateUrl: './gestion-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionPageComponent {
  private modalGestionService = inject(ModalsGestionService);
  private gestionService = inject(GestionService);
  private toastr = inject(ToastrService);
  private nivelService = inject(NivelService);

  estadoModalGestionEditar = computed(() => this.modalGestionService.obtenerEstadoEditar());
  estadoModalGestionRegistrar = computed(() => this.modalGestionService.obtenerEstadoRegistro());
  estadoModalVer = computed(() => this.modalGestionService.obtenerEstadoVer());


  listaGestion = computed(() => this.gestionService.listaGestion());
  listaNiveles = computed(() => this.gestionService.listaGestion());


  mostrarModalRegistrar(): void {
    this.modalGestionService.cambiarEstadoRegistro();
  }


  ejecutarAcciones(event: Event): void {
    let value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case ('registrar'):
        this.modalGestionService.cambiarEstadoRegistro();
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }

  ngOnInit() {
    this.nivelService.listarNiveles();
    this.gestionService.listarGestiones();
  }
}
