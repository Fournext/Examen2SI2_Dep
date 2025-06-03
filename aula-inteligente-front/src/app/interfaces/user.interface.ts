export interface UsuarioLogin {
  username: string,
  password: string
}

export interface UsuarioRegister {
  username: string,
  password: string,
  email: string,
  tipo_usuario: string,
  estado: string,
}
