import 'dart:convert';
import 'package:aula_inteligente/models/prediccion_modelo.dart';
import 'package:http/http.dart' as http;
import 'package:aula_inteligente/utils/config.dart';

class PrediccionesService {
  final String baseUrl = Config.baseUrl;

  /// Obtiene las predicciones para un estudiante por su ID
  Future<PrediccionModelo?> obtenerPredicciones(int idEstudiante) async {
    final url = Uri.parse('$baseUrl/prediccion_id/prediccion-estudiante/$idEstudiante/');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);
        return PrediccionModelo.fromJson(jsonData);
      } else {
        print('❌ Error al obtener predicciones: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('❌ Excepción al obtener predicciones: $e');
      return null;
    }
  }
}
