export interface NivelRegister {
  codigo: string,
  descripcion: string,
  aula: number
}

export interface Nivel {
  id: number,
  codigo: string,
  descripcion: string,
  aula: number,
  materias: number[]
}
