import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Materia, MateriaRegister } from '../../interfaces/materia.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/materias/'

  materiaActual = signal<Materia>({
    id: 0,
    codigo: '',
    nombre: '',
    carga_horaria: 0,
    estado: '',
    nivel: 0,
    nivel_descripcion: '',
    temas: [],
    asignacion_docente: []
  });

  listaMateria = signal<Materia[]>([]);


  registrarMateria(materia: MateriaRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, materia).pipe(
      tap(() => {
        this.listarMateria();
      })
    );
  }

  listarMateria() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaMateria.set(response.data);
      }
    )
  }

  actualizarMateria(aula: MateriaRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, aula, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarMateria();
      })
    )
  }

  constructor() { }

}
