import { NivelService } from './../../services/nivel/nivel.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModalsNivelService } from '../../services/nivel/modals-nivel.service';
import { FormularioRegisterComponent } from "../../components/nivel/formulario-register/formulario-register.component";
import { FormularioEditarComponent } from "../../components/nivel/formulario-editar/formulario-editar.component";
import { VerNivelComponent } from "../../components/nivel/ver-nivel/ver-nivel.component";
import { NivelItemComponent } from "../../components/nivel/nivel-item/nivel-item.component";
import { AulaService } from '../../services/aula/aula.service';

@Component({
  selector: 'app-nivel-page',
  imports: [FormularioRegisterComponent, FormularioEditarComponent, VerNivelComponent, NivelItemComponent],
  templateUrl: './nivel-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NivelPageComponent {

  private modalNivelService = inject(ModalsNivelService);
  private NivelService = inject(NivelService);
  private aulaService = inject(AulaService);

  estadoModalNivelEditar = computed(() => this.modalNivelService.obtenerEstadoEditar());
  estadoModalNivelRegistrar = computed(() => this.modalNivelService.obtenerEstadoRegistro());
  estadoModalVer = computed(() => this.modalNivelService.obtenerEstadoVer());

  listaNivel = computed(() => this.NivelService.listaNiveles());

  mostrarModalRegistrar(): void {
    this.modalNivelService.cambiarEstadoRegistro();
  }

  ejecutarAcciones(event: Event) {
    let value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case ('registrar'):
        this.modalNivelService.cambiarEstadoRegistro();
        break;
      default:
        console.log('Accion no registrada');
        break;
    }
  }

  ngOnInit() {
    this.aulaService.listarAulas();
    this.NivelService.listarNiveles();
  }
}
