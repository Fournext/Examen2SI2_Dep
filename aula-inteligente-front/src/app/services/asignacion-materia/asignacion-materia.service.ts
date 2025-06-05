import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AsignacionMateria, AsignacionMateriaRegister } from '../../interfaces/asignacion-materia.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionMateriaService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/asignacion_docentes/'

  asignacionMateriaActual = signal<AsignacionMateria>({
    id: 0,
    fecha: '',
    materia: 0,
    materia_nombre: '',
    docente: 0,
    docente_nombre_completo: '',
    gestion: 0,
    gestion_nombre: ''
  });

  listaAsignacionMateria = signal<AsignacionMateria[]>([]);


  registrarAsignacionMateria(asignacion: AsignacionMateriaRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, asignacion).pipe(
      tap(() => {
        this.listarAsignacionesMateria();
      })
    );
  }

  listarAsignacionesMateria() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        console.log('Asignaciones recibidas:', response);
        this.listaAsignacionMateria.set(response.data);
      }
    );
  }

  actualizarAsignaciones(asignacion: AsignacionMateriaRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, asignacion, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listaAsignacionMateria();
      })
    )
  }
  constructor() { }

}
