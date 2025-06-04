import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalsNivelService } from '../../../services/nivel/modals-nivel.service';
import { NivelService } from '../../../services/nivel/nivel.service';
import { AulaService } from '../../../services/aula/aula.service';
import { ToastrService } from 'ngx-toastr';
import { NivelRegister } from '../../../interfaces/nivel.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'formulario-register-aula',
  imports: [],
  templateUrl: './formulario-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegisterComponent {
  private modalNivelService = inject(ModalsNivelService);
  private nivelService = inject(NivelService);
  private aulaService = inject(AulaService);
  private toastr = inject(ToastrService);

  nivel = computed(() => this.nivelService.nivelActual());

  codigo = signal<string>('');
  descripcion = signal<string>('');
  aula = signal<number>(0);

  listaAula = computed(() => this.aulaService.listaAulas());

  registrarNivel(event: Event) {
    event.preventDefault();
    const nivel: NivelRegister = {
      codigo: this.codigo(),
      descripcion: this.descripcion(),
      aula: this.aula()
    }
    console.log(nivel);
    this.nivelService.registrarNivel(nivel).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarNivel();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al Registrar';
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
    this.modalNivelService.cambiarEstadoRegistro();
  }
}
