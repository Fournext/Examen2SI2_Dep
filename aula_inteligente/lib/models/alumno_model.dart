class Alumno {
  int? id;
  String nombre;
  String apellido;
  String carnetEstudiante;
  String fechaNacimiento;
  String direccion;
  String rude;
  String estado;
  String telefonoApoderado;
  String nombreApoderado;
  String apellidoApoderado;
  String carnetApoderado;
  int gestion;
  int nivel;
  int usuario;

  String? gestionNombre;
  String? nivelNombre;

  Alumno({
    this.id,
    required this.nombre,
    required this.apellido,
    required this.carnetEstudiante,
    required this.fechaNacimiento,
    required this.direccion,
    required this.rude,
    required this.estado,
    required this.telefonoApoderado,
    required this.nombreApoderado,
    required this.apellidoApoderado,
    required this.carnetApoderado,
    required this.gestion,
    required this.nivel,
    required this.usuario,
    
    this.gestionNombre,
    this.nivelNombre,
  });

  factory Alumno.fromJson(Map<String, dynamic> json) {
    return Alumno(
      id: json['id'],
      nombre: json['nombre'],
      apellido: json['apellido'],
      carnetEstudiante: json['carnet_estudiante'],
      fechaNacimiento: json['fecha_nacimiento'],
      direccion: json['direccion'],
      rude: json['rude'],
      estado: json['estado'],
      telefonoApoderado: json['telefono_apoderado'],
      nombreApoderado: json['nombre_apoderado'],
      apellidoApoderado: json['apellido_apoderado'],
      carnetApoderado: json['carnet_apoderado'],
      gestion: json['gestion'],
      nivel: json['nivel'],
      usuario: json['usuario'],
      gestionNombre:json['gestion_nombre'],
      nivelNombre:json['nivel_nombre'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nombre': nombre,
      'apellido': apellido,
      'carnet_estudiante': carnetEstudiante,
      'fecha_nacimiento': fechaNacimiento,
      'direccion': direccion,
      'rude': rude,
      'estado': estado,
      'telefono_apoderado': telefonoApoderado,
      'nombre_apoderado': nombreApoderado,
      'apellido_apoderado': apellidoApoderado,
      'carnet_apoderado': carnetApoderado,
      'gestion': gestion,
      'nivel': nivel,
      'usuario': usuario,
    };
  }
}
