import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.developments';
import { inject, Injectable } from '@angular/core';
import { UsuarioLogin } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.endpoint;
  private complements = 'api/usuario/';
  private http = inject(HttpClient);

  login(usuario: UsuarioLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complements}login/`, usuario);
  }
  constructor() { }

}
