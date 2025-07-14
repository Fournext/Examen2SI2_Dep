class Trimestre {
  int? id;
  String nombre;
  String fechaInicio;
  String fechaCulminacion;
  int gestion;
  String? gestionNombre; // solo presente al recibir, no al enviar

  Trimestre({
    this.id,
    required this.nombre,
    required this.fechaInicio,
    required this.fechaCulminacion,
    required this.gestion,
    this.gestionNombre,
  });

  factory Trimestre.fromJson(Map<String, dynamic> json) {
    return Trimestre(
      id: json['id'],
      nombre: json['nombre'],
      fechaInicio: json['fecha_inicio'],
      fechaCulminacion: json['fecha_culminacion'],
      gestion: json['gestion'],
      gestionNombre: json['gestion_nombre'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nombre': nombre,
      'fecha_inicio': fechaInicio,
      'fecha_culminacion': fechaCulminacion,
      'gestion': gestion,
    };
  }
}
