import 'package:aula_inteligente/screens/AlumnoScreen/DashboardAlumnoScreen.dart';
import 'package:aula_inteligente/screens/AlumnoScreen/MateriaAlumnoScreen.dart';
import 'package:aula_inteligente/screens/AlumnoScreen/desempe%C3%B1oAlumno.dart';
import 'package:aula_inteligente/screens/AlumnoScreen/informacionScreen.dart';
import 'package:aula_inteligente/screens/LoginScreen.dart';
import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Aula Inteligente',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginScreen(),
        '/dashboardalumno': (context) => DashboardAlumnoScreen(),
        '/materiaAlumno': (context) => MateriaAlumnoScreen(),
        '/desempeno': (context) => DesempenoAlumnoScreen(),
        '/informacion': (context) => InformacionScreen(),

      },
    );
  }
}
