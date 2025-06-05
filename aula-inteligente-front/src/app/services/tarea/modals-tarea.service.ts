import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsTareaService {
  private formularioRegistro = signal<boolean>(false);
  private lista = signal<boolean>(false);

  obtenerEstadoRegistro(): boolean {
    return this.formularioRegistro();
  }

  obtenerEstadolista(): boolean {
    return this.lista();
  }

  cambiarEstadoRegistro(): void {
    this.formularioRegistro.set(!this.formularioRegistro());
  }

  cambiarEstadoLista(): void {
    this.lista.set(!this.lista());
  }

  constructor() { }

}
