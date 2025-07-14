import 'dart:convert';
import 'package:aula_inteligente/models/boletin_materia_modelo.dart';
import 'package:aula_inteligente/utils/config.dart';
import 'package:http/http.dart' as http;

class BoletinMateriaService {
  final String baseUrl = Config.baseUrl;

  Future<List<BoletinMateria>> listarBoletines() async {
    final response = await http.get(Uri.parse('$baseUrl/boletin_materia/listar/'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);

      final List<dynamic> jsonList = jsonData is List
          ? jsonData
          : jsonData['data']; 

      return jsonList.map((json) => BoletinMateria.fromJson(json)).toList();
    } else {
      throw Exception('❌ Error al cargar los boletines: ${response.statusCode}');
    }
  }

  /// 🔍 Filtra boletines por ID de trimestre
  List<BoletinMateria> filtrarBoletines({
    required List<BoletinMateria> boletines,
    int? idTrimestre,
    int? idEstudiante,
  }) {
    return boletines.where((boletin) {
      final coincideTrimestre = idTrimestre == null || boletin.trimestre == idTrimestre;
      final coincideEstudiante = idEstudiante == null || boletin.estudiante == idEstudiante;
      return coincideTrimestre && coincideEstudiante;
    }).toList();
  }
}
