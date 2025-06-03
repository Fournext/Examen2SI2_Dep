import { ChangeDetectionStrategy, Component, computed, inject, NgModule, signal } from '@angular/core';
import { TarjetaAdministrativoComponent } from "../../components/administrativos-componentes/tarjeta-administrativo/tarjeta-administrativo.component";
import { ModalsAdministrativoService } from '../../services/administrativo/modals-administrativo.service';
import { FormularioEditarAdministrativoComponent } from "../../components/administrativos-componentes/formulario-editar-administrativo/formulario-editar-administrativo.component";
import { FormularioRegistrarAdministrativoComponent } from "../../components/administrativos-componentes/formulario-registrar-administrativo/formulario-registrar-administrativo.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/usuario/auth.service';

@Component({
  selector: 'app-administrativos-page',
  imports: [TarjetaAdministrativoComponent, FormularioEditarAdministrativoComponent, FormularioRegistrarAdministrativoComponent, FormsModule],
  templateUrl: './administrativos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdministrativosPageComponent {
  private modalAdministrativoService = inject(ModalsAdministrativoService);
  private authService = inject(AuthService);

  estadoModalAdministrativoEditar = computed(() => this.modalAdministrativoService.obtenerEstadoEditar());
  estadoModalAdministrativoRegister = computed(() => this.modalAdministrativoService.obtenerEstadoRegistro());

  ejecutarAccion(event: Event) {
    let value: string = (event.target as HTMLSelectElement).value;
    console.log(value);

    switch (value) {
      case ('registrar'):
        this.modalAdministrativoService.cambiarEstadoRegistro();
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
    const user = this.authService.getUsername();
    const role = this.authService.getRole();
    console.log('Usuario:', user, 'Rol:', role);
  }

}
