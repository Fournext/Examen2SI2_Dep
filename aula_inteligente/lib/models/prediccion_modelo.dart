class PrediccionModelo {
  final int estudianteId;
  final Map<String, double> predicciones;

  PrediccionModelo({
    required this.estudianteId,
    required this.predicciones,
  });

  factory PrediccionModelo.fromJson(Map<String, dynamic> json) {
    final rawPredicciones = json['predicciones'] as Map<String, dynamic>;

    final Map<String, double> parsedPredicciones = rawPredicciones.map(
      (key, value) => MapEntry(key, (value as num).toDouble()),
    );

    return PrediccionModelo(
      estudianteId: json['estudiante_id'],
      predicciones: parsedPredicciones,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'estudiante_id': estudianteId,
      'predicciones': predicciones,
    };
  }
}
