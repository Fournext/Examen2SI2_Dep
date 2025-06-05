export interface TareaRegister {
  fecha: string,
  tipo: string,
  descripcion: string,
  trimestre: number,
  estudiante: number,
  nota: number,
  materia: number
}

export interface Tarea {
  id: number,
  fecha: string,
  tipo: string,
  descripcion: string,
  trimestre: number,
  estudiante: number,
  nota: number,
  materia: number,
  trimestre_nombre: string,
  estudiante_nombre: string,
  estudiante_apellido: string,
  materia_nombre: string
}
