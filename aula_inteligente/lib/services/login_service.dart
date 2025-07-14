import 'dart:convert';
import 'package:aula_inteligente/utils/config.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class LoginService {
  final String _baseUrl = Config.baseUrl;

  Future<bool> login(String username, String password) async {
    final url = Uri.parse('$_baseUrl/usuario/login/');
    print('📡 Intentando login a: $url');
    int retries = 3;

    for (int i = 0; i < retries; i++) {
      try {
        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'username': username,
            'password': password,
          }),
        );
       
        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          if (data.containsKey('token')) {
            final prefs = await SharedPreferences.getInstance();
            await prefs.setString('jwt_token', data['token']);
            return true;
          } else {
            print("❌ No se encontró el token en la respuesta.");
            return false;
          }
        } else {
          print(url);
          print("❌ Error al hacer login: ${response.statusCode}");
          return false;
        }
      } catch (e) {
        print("⏳ Backend aún no responde. Intento ${i + 1} de $retries");
        await Future.delayed(const Duration(seconds: 2));
      }
    }

    print("❌ No se pudo conectar con el servidor.");
    return false;
  }


  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token');
  }
}