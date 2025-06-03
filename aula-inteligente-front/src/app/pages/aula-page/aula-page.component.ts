import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AulaItemComponent } from "../../components/aula-components/aula-item/aula-item.component";
import { ModalsAulaService } from '../../services/aula/modals-aula.service';
import { FormularioEditarComponent } from "../../components/aula-components/formulario-editar/formulario-editar.component";
import { FormularioRegistrarComponent } from "../../components/aula-components/formulario-registrar/formulario-registrar.component";
import { VerAulaComponent } from "../../components/aula-components/ver-aula/ver-aula.component";

@Component({
  selector: 'aula-page',
  imports: [AulaItemComponent, FormularioEditarComponent, FormularioRegistrarComponent, VerAulaComponent],
  templateUrl: './aula-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AulaPageComponent {
  private modalAulaService = inject(ModalsAulaService);

  estadoModalAulaEditar = computed(() => this.modalAulaService.obtenerEstadoEditar());
  estadoModalAulaRegistrar = computed(() => this.modalAulaService.obtenerEstadoRegistro());
  estadoModalVer = computed(() => this.modalAulaService.obtenerEstadoVer());

  mostrarModalRegistrar(): void {
    this.modalAulaService.cambiarEstadoRegistro();
  }

  ejecutarAcciones(event: Event) {
    let value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case ('registrar'):
        this.modalAulaService.cambiarEstadoRegistro();
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }

  listaDeNiveles: string[] = ['1ro Basico', '2do Basico', '3ro Basico', '4to Basico', '5to Basico', '6to Basico'];
}
