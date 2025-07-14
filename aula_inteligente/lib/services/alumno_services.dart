import 'dart:convert';
import 'package:aula_inteligente/models/alumno_model.dart';
import 'package:aula_inteligente/utils/config.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AlumnoService {
  final String baseUrl = Config.baseUrl;

  Future<List<Alumno>> listarAlumnos() async {
    final response = await http.get(Uri.parse('$baseUrl/estudiantes/listar/'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);

      final List<dynamic> jsonList = jsonData is List
          ? jsonData
          : jsonData['data']; // si tu backend responde con {"alumnos": [...]}

      return jsonList.map((json) => Alumno.fromJson(json)).toList();
    } else {
      throw Exception('Error al cargar los estudiantes: ${response.statusCode}');
    }
  }


  Future<Alumno?> obtenerAlumnoActual() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwt_token');

    if (token == null) {
      print("❌ Token no encontrado en SharedPreferences.");
      return null;
    }

    try {
      Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
      int userId = decodedToken['id']; 
      AlumnoService alumnoService = AlumnoService();
      List<Alumno> alumnos = await alumnoService.listarAlumnos();
      Alumno? alumnoActual;
      try {
        alumnoActual = alumnos.firstWhere(
          (alumno) => alumno.usuario == userId,
        );
      } catch (e) {
        alumnoActual = null;
      }

      return alumnoActual;
    } catch (e) {
      print("❌ Error al obtener el alumno actual: $e");
      return null;
    }
  }
}
