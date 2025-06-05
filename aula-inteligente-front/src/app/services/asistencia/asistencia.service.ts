import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Asistencia, AsistenciaRegister } from '../../interfaces/asistencia.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/asistencia/'

  asistenciaActual = signal<Asistencia>({
    id: 0,
    hora_entrada: '',
    justificacion: '',
    trimestre: 0,
    estudiante: 0,
    materia: 0,
    trimestre_nombre: '',
    estudiante_nombre: '',
    estudiante_apellido: '',
    materia_nombre: ''
  });

  listaAsistencia = signal<Asistencia[]>([]);



  registrarAsistencia(asistencia: AsistenciaRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, asistencia).pipe(
      tap(() => {
        this.listarAsistencias();
      })
    );
  }

  listarAsistencias() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaAsistencia.set(response.data);
      }
    )
  }

  actualzarAsistencia(asistencia: AsistenciaRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, asistencia, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarAsistencias();
      })
    )
  }

  constructor() { }

}
