import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsNivelService } from '../../../services/nivel/modals-nivel.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { AulaService } from '../../../services/aula/aula.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ver-nivel',
  imports: [],
  templateUrl: './ver-nivel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerNivelComponent {
  private modalNivelService = inject(ModalsNivelService);
  private nivelService = inject(NivelService);

  nivel = computed(() => this.nivelService.nivelActual());

  codigo = signal<string>(this.nivel().codigo);
  descripcion = signal<string>(this.nivel().descripcion);
  aula = signal<number>(this.nivel().aula);
  materias = signal<number[]>(this.nivel().materias);

  cerrarNivel() {
    this.modalNivelService.cambiarEstadoVer();
  }
}
