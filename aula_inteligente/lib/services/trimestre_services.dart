import 'dart:convert';
import 'package:aula_inteligente/models/trimestre_modelo.dart';
import 'package:http/http.dart' as http;
import 'package:aula_inteligente/utils/config.dart';

class TrimestreService {
  final String baseUrl = Config.baseUrl;

  Future<List<Trimestre>> listarTrimestres() async {
    final response = await http.get(Uri.parse('$baseUrl/trimestres/listar/'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);

      final List<dynamic> jsonList = jsonData is List
          ? jsonData
          : jsonData['data']; // Si tu backend usa {"data": [...]}

      return jsonList.map((json) => Trimestre.fromJson(json)).toList();
    } else {
      throw Exception('❌ Error al listar trimestres: ${response.statusCode}');
    }
  }

  // 🔎 Filtrar trimestres por año (usando fecha_inicio)
  Future<List<Trimestre>> filtrarPorAnio(int anio) async {
    final trimestres = await listarTrimestres();
    return trimestres.where((t) {
      final fecha = DateTime.tryParse(t.fechaInicio);
      return fecha != null && fecha.year == anio;
    }).toList();
  }

  // 🔎 Filtrar por nombre de trimestre (ej: "Primer Trimestre")
  Future<List<Trimestre>> filtrarPorNombre(String nombreTrimestre) async {
    final trimestres = await listarTrimestres();
    return trimestres.where((t) => t.nombre.toLowerCase().contains(nombreTrimestre.toLowerCase())).toList();
  }
}
