import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.developments';
import { Nivel, NivelRegister } from '../../interfaces/nivel.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/niveles/'

  nivelActual = signal<Nivel>({
    id: 0,
    codigo: '',
    descripcion: '',
    aula: 0,
    materias: []
  });

  listaNiveles = signal<Nivel[]>([]);


  registrarNivel(nivel: NivelRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complementoUrl}crear/`, nivel).pipe(
      tap(() => {
        this.listarNiveles();
      })
    );
  }

  listarNiveles() {
    this.http.get<any>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaNiveles.set(response.data);
      }
    )
  }

  actualizarNivel(nivel: NivelRegister, id: number) {
    return this.http.put<any>(`${this.apiUrl}${this.complementoUrl}actualizar/`, nivel, {
      params: {
        id: id
      }
    }).pipe(
      tap(() => {
        this.listarNiveles();
      })
    )
  }

  constructor() { }

}
