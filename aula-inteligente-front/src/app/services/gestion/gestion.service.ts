import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Gestion, GestionRegister } from '../../interfaces/gestion.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/gestiones/'

  gestionActual = signal<Gestion>({
    id: 0,
    nombre: '',
    estado: '',
    fecha_inicio: '',
    fecha_culminacion: '',
    asignacion_docente: [],
    estudiantes: []
  });

  listaGestion = signal<Gestion[]>([]);


  registrarGestion(gestion: GestionRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, gestion).pipe(
      tap(() => {
        this.listarGestiones();
      })
    );
  }

  listarGestiones() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaGestion.set(response.data);
      }
    )
  }

  actualizarGestion(gestion: GestionRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, gestion, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarGestiones();
      })
    )
  }

  constructor() { }

}
