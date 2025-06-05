import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../components/layout/footer/footer.component";
import { SideBarComponenteComponent } from "../components/layout/side-bar-componente/side-bar-componente.component";
import { HeaderComponent } from "../components/layout/header/header.component";

@Component({
  selector: 'app-layout-docente',
  imports: [RouterLink, RouterOutlet, FooterComponent, SideBarComponenteComponent, HeaderComponent],
  templateUrl: './layout-docente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDocenteComponent {

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
