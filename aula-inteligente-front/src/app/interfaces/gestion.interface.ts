export interface GestionRegister {
  nombre: string,
  estado: string,
  fecha_inicio: string,
  fecha_culminacion: string
}

export interface Gestion {
  id: number,
  nombre: string,
  estado: string,
  fecha_inicio: string,
  fecha_culminacion: string
  asignacion_docente: number[],
  estudiantes: number[]
}
