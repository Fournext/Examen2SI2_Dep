export interface TrimestreRegister {
  nombre: string,
  fecha_inicio: string,
  fecha_culminacion: string,
  gestion: number
}

export interface Trimestre {
  id: number,
  nombre: string,
  fecha_inicio: string,
  fecha_culminacion: string,
  gestion: number,
  gestion_nombre: string
}
