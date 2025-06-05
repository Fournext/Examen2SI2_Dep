export interface ParticipacionRegister {
  fecha: string,
  detalle: string,
  trimestre: number,
  estudiante: number,
  materia: number
}

export interface Participacion {
  id: number,
  fecha: string,
  detalle: string,
  trimestre: number,
  estudiante: number,
  materia: number,
  trimestre_nombre: string,
  estudiante_nombre: string,
  estudiante_apellido: string,
  materia_nombre: string
}
