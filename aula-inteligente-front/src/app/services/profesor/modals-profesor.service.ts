import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsProfesorService {
  private formularioRegistro = signal<boolean>(false);
  private formularioEditar = signal<boolean>(false);

  obtenerEstadoRegistro(): boolean {
    return this.formularioRegistro();
  }

  obtenerEstadoEditar(): boolean {
    return this.formularioEditar();
  }

  cambiarEstadoRegistro(): void {
    this.formularioRegistro.set(!this.formularioRegistro());
  }

  cambiarEstadoEditar(): void {
    this.formularioEditar.set(!this.formularioEditar());
  }

  constructor() { }

}
