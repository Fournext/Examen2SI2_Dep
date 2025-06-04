import { inject, Injectable, signal } from '@angular/core';
import { Estudiante, EstudianteRegister } from '../../interfaces/estudiante.interface';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/estudiantes/'

  estudianteActual = signal<Estudiante>({
    id: 0,
    nombre: '',
    apellido: '',
    carnet_estudiante: '',
    fecha_nacimiento: '',
    direccion: '',
    rude: '',
    estado: '',
    telefono_apoderado: '',
    nombre_apoderado: '',
    apellido_apoderado: '',
    carnet_apoderado: '',
    gestion: 0,
    gestion_nombre: '',
    nivel: 0,
    nivel_nombre: '',
    usuario: 0,
    usuario_username: ''
  });

  listaEstudiantes = signal<Estudiante[]>([]);


  registrarEstudiante(gestion: EstudianteRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, gestion).pipe(
      tap(() => {
        this.listarEstudiantes();
      })
    );
  }

  listarEstudiantes() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaEstudiantes.set(response.data);
      }
    )
  }

  actualiarEstudiante(gestion: EstudianteRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, gestion, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarEstudiantes();
      })
    )
  }
  constructor() { }

}
