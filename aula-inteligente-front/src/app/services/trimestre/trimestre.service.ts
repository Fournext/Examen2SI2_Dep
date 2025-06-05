import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { Trimestre } from '../../interfaces/trimestre.interface';

@Injectable({
  providedIn: 'root'
})
export class TrimestreService {
  private http = inject(HttpClient);
  private apiUrl = environment.endpoint;
  private complementoUrl = 'api/trimestres/'

  listaTrimestres = signal<Trimestre[]>([]);

  listarTrimestres() {
    this.http.get<any[]>(`${this.apiUrl}${this.complementoUrl}listar/`).subscribe(
      (response: any) => {
        this.listaTrimestres.set(response.data);
      }
    )
  }

  constructor() { }

}
