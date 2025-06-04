export interface MateriaRegister {
  codigo: string,
  nombre: string,
  carga_horaria: number,
  estado: string,
  nivel: number
}

export interface Materia {
  id: number,
  codigo: string,
  nombre: string,
  carga_horaria: number,
  estado: string,
  nivel: number,
  nivel_descripcion: string,
  temas: number[],
  asignacion_docente: number[]
}
