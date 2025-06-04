export interface EstudianteRegister {
  nombre: string,
  apellido: string,
  carnet_estudiante: string,
  fecha_nacimiento: string,
  direccion: string,
  rude: string,
  estado: string,
  telefono_apoderado: string,
  nombre_apoderado: string,
  apellido_apoderado: string,
  carnet_apoderado: string,
  gestion: number,
  nivel: number,
  usuario: number
}

export interface Estudiante {
  id: number,
  nombre: string,
  apellido: string,
  carnet_estudiante: string,
  fecha_nacimiento: string,
  direccion: string,
  rude: string,
  estado: string,
  telefono_apoderado: string,
  nombre_apoderado: string,
  apellido_apoderado: string,
  carnet_apoderado: string,
  gestion: number,
  gestion_nombre: string,
  nivel: number,
  nivel_nombre: string,
  usuario: number,
  usuario_username: string
}
