import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Materia } from '../../../../interfaces/materia.interface';
import { AsignacionMateria } from '../../../../interfaces/asignacion-materia.interface';
import { Nivel } from '../../../../interfaces/nivel.interface';
import { Router } from '@angular/router';
import { DatosGlobalesAulaService } from '../../../../services/datos-aula-docente/datos-globales-aula.service';

@Component({
  selector: 'materia-tarjeta-materia',
  imports: [],
  templateUrl: './materia-tarjeta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriaTarjetaComponent {
  private routes = inject(Router);
  private datosGlobales = inject(DatosGlobalesAulaService);

  asignacion = input.required<AsignacionMateria>();
  materia = input.required<Materia>();
  nivel = input.required<Nivel>();
  estudiantes = input.required<any[]>();

  mostrarAula() {

    this.datosGlobales.listaEstudiante.set(this.estudiantes());
    this.datosGlobales.materia.set(this.materia());
    this.datosGlobales.nivelActual.set(this.nivel());
    this.datosGlobales.asignacion_materia.set(this.asignacion());

    this.routes.navigate(['/private-docente/aula']);

  }
}
