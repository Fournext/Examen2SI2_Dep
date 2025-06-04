import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Aula, AulaRegister } from '../../interfaces/aula.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/aula/'

  aulaActual = signal<Aula>({
    id: 0,
    codigo: '',
    capacidad: 0,
    estado: ''
  });

  listaAulas = signal<Aula[]>([]);


  registrarAula(aula: AulaRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, aula).pipe(
      tap(() => {
        this.listarAulas();
      })
    );
  }

  listarAulas() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaAulas.set(response.data);
      }
    )
  }

  actualizarAula(aula: AulaRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, aula, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarAulas();
      })
    )
  }

  constructor() { }

}
