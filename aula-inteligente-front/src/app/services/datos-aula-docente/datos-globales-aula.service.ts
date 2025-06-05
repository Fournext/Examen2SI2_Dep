import { Injectable, signal } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { Nivel } from '../../interfaces/nivel.interface';
import { AsignacionMateria } from '../../interfaces/asignacion-materia.interface';
import { Docente } from '../../interfaces/docente.interface';
import { Materia } from '../../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosGlobalesAulaService {
  listaEstudiante = signal<Estudiante[]>([]);
  nivelActual = signal<Nivel>({
    id: 0,
    codigo: '',
    descripcion: '',
    aula: 0,
    materias: []
  });
  materia = signal<Materia>({
    id: 0,
    codigo: '',
    nombre: '',
    carga_horaria: 0,
    estado: '',
    nivel: 0,
    nivel_descripcion: '',
    temas: [],
    asignacion_docente: []
  });
  asignacion_materia = signal<AsignacionMateria>({
    id: 0,
    fecha: '',
    materia: 0,
    materia_nombre: '',
    docente: 0,
    docente_nombre_completo: '',
    gestion: 0,
    gestion_nombre: ''
  });
  docente = signal<Docente>({
    id: 0,
    nombre: '',
    apellido: '',
    carnet: '',
    telefono: '',
    turno: '',
    fecha_nacimiento: '',
    especialidad: '',
    fecha_contratacion: '',
    asignacion_docente: [],
    usuario: 0,
    usuario_username: ''
  });

  estudianteActual = signal<Estudiante>({
    id: 0,
    nombre: '',
    apellido: '',
    carnet_estudiante: '',
    fecha_nacimiento: '',
    direccion: '',
    rude: '',
    estado: '',
    telefono_apoderado: '',
    nombre_apoderado: '',
    apellido_apoderado: '',
    carnet_apoderado: '',
    gestion: 0,
    gestion_nombre: '',
    nivel: 0,
    nivel_nombre: '',
    usuario: 0,
    usuario_username: ''
  })
  constructor() { }

}
