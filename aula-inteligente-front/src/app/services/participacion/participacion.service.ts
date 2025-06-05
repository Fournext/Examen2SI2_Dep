import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Participacion, ParticipacionRegister } from '../../interfaces/participacion.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/participacion/'

  participacionActual = signal<Participacion>({
    id: 0,
    fecha: '',
    detalle: '',
    trimestre: 0,
    estudiante: 0,
    materia: 0,
    trimestre_nombre: '',
    estudiante_nombre: '',
    estudiante_apellido: '',
    materia_nombre: ''
  });

  listaParticipacion = signal<Participacion[]>([]);


  registrarParticipacion(participacion: ParticipacionRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, participacion).pipe(
      tap(() => {
        this.listarParticipacion();
      })
    );
  }

  listarParticipacion() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaParticipacion.set(response.data);
      }
    )
  }

  constructor() { }

}
