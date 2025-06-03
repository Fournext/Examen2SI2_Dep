import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DashboardPageComponent } from "../pages/dashboard-page/dashboard-page.component";
import { SideBarComponentComponent } from "../components/layout/side-bar-component/side-bar-component.component";
import { FooterComponentPrivateComponent } from "../components/layout/footer-component-private/footer-component-private.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponentePrivateComponent } from "../components/layout/header-componente-private/header-componente-private.component";
import { ModalsAdministrativoService } from '../services/administrativo/modals-administrativo.service';

@Component({
  selector: 'app-layout-privado',
  imports: [SideBarComponentComponent, FooterComponentPrivateComponent, RouterOutlet, HeaderComponentePrivateComponent, RouterLink],
  templateUrl: './layout-privado.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPrivadoComponent {

  botones = signal([
    { texto: 'ADMINISTRATIVOS', ruta: '/admin' },
    { texto: 'PROFESORES', ruta: '/profesores' },
    { texto: 'ALUMNOS', ruta: '/alumnos' },
    { texto: 'AULAS', ruta: '/aulas' },
    { texto: 'MATERIAS', ruta: '/materias' },
    { texto: 'NIVELES', ruta: '/niveles' },
  ]);

  mostrarSidebar = false;
  toggleSidebar() {
    this.mostrarSidebar = !this.mostrarSidebar;
  }
}
