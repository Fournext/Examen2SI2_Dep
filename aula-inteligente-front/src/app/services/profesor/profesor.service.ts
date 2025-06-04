import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Docente, DocenteRegister } from '../../interfaces/docente.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private http = inject(HttpClient);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/docentes/'

  profesorActual = signal<Docente>({
    id: 0,
    nombre: '',
    apellido: '',
    carnet: '',
    telefono: '',
    turno: '',
    fecha_nacimiento: '',
    especialidad: '',
    fecha_contratacion: '',
    asignacion_docente: [],
    usuario: 0,
    usuario_username: ''
  });

  listaDocente = signal<Docente[]>([]);

  registrarDocente(docente: DocenteRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, docente).pipe(
      tap(() => {
        this.listarDocente();
      })
    );
  }


  listarDocente() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaDocente.set(response.data);
      }
    )
  }


  actualizarDocente(docente: DocenteRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, docente, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarDocente();
      })
    )
  }


  constructor() { }



}
