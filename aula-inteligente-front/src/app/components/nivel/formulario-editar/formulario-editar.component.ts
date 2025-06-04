import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsNivelService } from '../../../services/nivel/modals-nivel.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { AulaService } from '../../../services/aula/aula.service';
import { NivelRegister } from '../../../interfaces/nivel.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-editar-nivel',
  imports: [],
  templateUrl: './formulario-editar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioEditarComponent {
  private modalNivelService = inject(ModalsNivelService);
  private nivelService = inject(NivelService);
  private aulaService = inject(AulaService);
  private toastr = inject(ToastrService);

  nivel = computed(() => this.nivelService.nivelActual());

  id = signal<number>(this.nivel().id);
  codigo = signal<string>(this.nivel().codigo);
  descripcion = signal<string>(this.nivel().descripcion);
  aula = signal<number>(this.nivel().aula);
  materias = signal<number[]>(this.nivel().materias);

  listaAula = computed(() => this.aulaService.listaAulas());

  actualizarNivel(event: Event) {
    event.preventDefault();
    const nivel: NivelRegister = {
      codigo: this.codigo(),
      descripcion: this.descripcion(),
      aula: this.aula()
    }
    console.log(nivel);
    this.nivelService.actualizarNivel(nivel, this.id()).subscribe({
      next: (response: any) => {
        this.toastr.success('Acualizado correctamente');
        this.cerrarNivel();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al actualizar';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 3000
        });
      }
    })

  }

  obtenerAula(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.aula.set(+value);
  }

  cerrarNivel() {
    this.modalNivelService.cambiarEstadoEditar();
  }



}
