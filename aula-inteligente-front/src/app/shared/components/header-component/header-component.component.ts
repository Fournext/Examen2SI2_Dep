import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponentComponent {
  mostrarVolver = signal<boolean>(false);
  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      this.mostrarVolver.set(rutaActual !== '/' && rutaActual !== '/home');
    });
  }
  volver() {
    this.router.navigate(['/home']);
  }
}
