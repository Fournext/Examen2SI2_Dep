import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { Tarea, TareaRegister } from '../../interfaces/tareas.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private http = inject(HttpClient);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/tarea/'

  tareaActual = signal<Tarea>({
    id: 0,
    fecha: '',
    tipo: '',
    descripcion: '',
    trimestre: 0,
    estudiante: 0,
    nota: 0,
    materia: 0,
    trimestre_nombre: '',
    estudiante_nombre: '',
    estudiante_apellido: '',
    materia_nombre: ''
  });

  listaTarea = signal<Tarea[]>([]);

  registrarTarea(tarea: TareaRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, tarea).pipe(
      tap(() => {
        this.listarTarea();
      })
    );
  }


  listarTarea() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaTarea.set(response.data);
      }
    )
  }


  actualizarTarea(tarea: TareaRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, tarea, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarTarea();
      })
    )
  }

  constructor() { }

}
