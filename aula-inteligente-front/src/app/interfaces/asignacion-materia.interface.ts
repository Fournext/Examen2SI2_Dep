export interface AsignacionMateriaRegister {
  fecha: string,
  materia: number,
  docente: number,
  gestion: number
}

export interface AsignacionMateria {
  id: number,
  fecha: string,
  materia: number,
  materia_nombre: string,
  docente: number,
  docente_nombre_completo: string,
  gestion: number,
  gestion_nombre: string
}
