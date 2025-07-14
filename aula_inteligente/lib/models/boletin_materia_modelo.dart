class BoletinMateria {
  int? id;
  double ser;
  double saber;
  double hacer;
  double decidir;
  int trimestre;
  int estudiante;
  int materia;

  // Campos opcionales solo usados para mostrar
  String? trimestreNombre;
  String? estudianteNombre;
  String? estudianteApellido;
  String? materiaNombre;

  BoletinMateria({
    this.id,
    required this.ser,
    required this.saber,
    required this.hacer,
    required this.decidir,
    required this.trimestre,
    required this.estudiante,
    required this.materia,
    this.trimestreNombre,
    this.estudianteNombre,
    this.estudianteApellido,
    this.materiaNombre,
  });

  factory BoletinMateria.fromJson(Map<String, dynamic> json) {
    return BoletinMateria(
      id: json['id'],
      ser: (json['ser'] as num).toDouble(),
      saber: (json['saber'] as num).toDouble(),
      hacer: (json['hacer'] as num).toDouble(),
      decidir: (json['decidir'] as num).toDouble(),
      trimestre: json['trimestre'],
      estudiante: json['estudiante'],
      materia: json['materia'],
      trimestreNombre: json['trimestre_nombre'],
      estudianteNombre: json['estudiante_nombre'],
      estudianteApellido: json['estudiante_apellido'],
      materiaNombre: json['materia_nombre'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'ser': ser,
      'saber': saber,
      'hacer': hacer,
      'decidir': decidir,
      'trimestre': trimestre,
      'estudiante': estudiante,
      'materia': materia,
    };
  }
}
