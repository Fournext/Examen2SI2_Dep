import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.developments';
import { UsuarioRegister } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.endpoint;
  private complement = 'api/usuario/';

  registerUsuario(user: UsuarioRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.complement}register/`, user);
  }

  constructor() { }

}
