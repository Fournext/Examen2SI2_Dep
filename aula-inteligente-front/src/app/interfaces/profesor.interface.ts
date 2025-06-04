export interface DocenteRegister {
  nombre: string,
  apellido: string,
  carnet: string,
  telefono: string,
  turno: string,
  fecha_nacimiento: string,
  especialidad: string,
  fecha_contratacion: string,
  usuario: number
}

export interface Docente {
  id: number,
  nombre: string,
  apellido: string,
  carnet: string,
  telefono: string,
  turno: string,
  fecha_nacimiento: string,
  especialidad: string,
  fecha_contratacion: string,
  asignacion_docente: number[],
  usuario: number,
  usuario_username: string
}


