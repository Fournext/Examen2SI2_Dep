import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/usuario/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'side-bar-componente-docente',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar-componente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponenteComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
