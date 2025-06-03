import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsMateriaService {
  private formularioRegistro = signal<boolean>(false);
  private formularioEditar = signal<boolean>(false);
  private formularioVer = signal<boolean>(false);

  obtenerEstadoRegistro(): boolean {
    return this.formularioRegistro();
  }

  obtenerEstadoEditar(): boolean {
    return this.formularioEditar();
  }

  obtenerEstadoVer(): boolean {
    return this.formularioVer();
  }

  cambiarEstadoRegistro(): void {
    this.formularioRegistro.set(!this.formularioRegistro());
  }

  cambiarEstadoEditar(): void {
    this.formularioEditar.set(!this.formularioEditar());
  }
  cambiarEstadoVer(): void {
    this.formularioVer.set(!this.formularioVer());
  }

  constructor() { }

}
