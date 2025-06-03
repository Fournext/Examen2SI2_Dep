import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/usuario/auth.service';

@Component({
  selector: 'side-bar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponentComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

}
