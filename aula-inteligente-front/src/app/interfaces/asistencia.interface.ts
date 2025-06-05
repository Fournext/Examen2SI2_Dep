export interface AsistenciaRegister {
  hora_entrada: string,
  justificacion: string,
  trimestre: number,
  estudiante: number,
  materia: number
}
export interface Asistencia {
  id: number,
  hora_entrada: string,
  justificacion: string,
  trimestre: number,
  estudiante: number,
  materia: number,
  trimestre_nombre: string,
  estudiante_nombre: string,
  estudiante_apellido: string,
  materia_nombre: string
}
