import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GestionRegister } from '../../../interfaces/gestion.interface';
import { GestionService } from '../../../services/gestion/gestion.service';
import { ModalsGestionService } from '../../../services/gestion/modals-gestion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'formulario-register-gestion',
  imports: [],
  templateUrl: './formulario-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRegisterComponent {
  private modalGestionService = inject(ModalsGestionService);
  private gestionService = inject(GestionService);
  private toastr = inject(ToastrService);


  //datos
  nombre = signal<string>('');
  estado = signal<string>('');
  fecha_inicio = signal<string>('');
  fecha_culminacion = signal<string>('');

  registrarGestion(event: Event) {
    event.preventDefault();
    const gestion: GestionRegister = {
      nombre: this.nombre(),
      estado: this.estado(),
      fecha_inicio: this.fecha_inicio(),
      fecha_culminacion: this.fecha_culminacion()
    }
    console.log(gestion);

    this.gestionService.registrarGestion(gestion).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.cerrarModalRegister();
      },
      error: (e: HttpErrorResponse) => {
        const errorMessage = e.error?.detail || e.error?.message || 'Error al registrar';
        this.toastr.error(errorMessage, "Error", {
          positionClass: 'toast-bottom-right',
          timeOut: 1500
        });
      }
    })
  }



  obtenerEstado(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.estado.set(value);
  }

  cerrarModalRegister() {
    this.modalGestionService.cambiarEstadoRegistro();
  }
}
