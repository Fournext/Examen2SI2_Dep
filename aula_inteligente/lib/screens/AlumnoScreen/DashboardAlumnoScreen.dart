import 'package:aula_inteligente/screens/AlumnoScreen/MateriaAlumnoScreen.dart';
import 'package:aula_inteligente/screens/AlumnoScreen/desempe%C3%B1oAlumno.dart';
import 'package:aula_inteligente/screens/AlumnoScreen/informacionScreen.dart';
import 'package:aula_inteligente/services/login_service.dart';
import 'package:aula_inteligente/models/alumno_model.dart';
import 'package:aula_inteligente/services/alumno_services.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class DashboardAlumnoScreen extends StatefulWidget {
  const DashboardAlumnoScreen({super.key});

  @override
  _DashboardAlumnoScreenState createState() => _DashboardAlumnoScreenState();
}

class _DashboardAlumnoScreenState extends State<DashboardAlumnoScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  String _currentRoute = '/inicio';

  Alumno? alumnoActual;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this)
      ..addListener(() {
        if (_controller.value >= 0.5) _controller.stop();
      });

    cargarAlumno();
  }

  Future<void> cargarAlumno() async {
    Alumno? alumno = await AlumnoService().obtenerAlumnoActual();
    setState(() {
      alumnoActual = alumno;
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget _buildMainContent() {
    switch (_currentRoute) {
      case '/inicio':
        return _buildInicio();
      case '/materiaAlumno':
        return const MateriaAlumnoScreen();
      case '/desempeno':
        return const DesempenoAlumnoScreen();
      case '/informacion':
        return const InformacionScreen();
      default:
        return const Center(child: Text('Contenido no disponible'));
    }
  }

  Widget _buildInicio() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Bienvenido alumno',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            alumnoActual != null
                ? '${alumnoActual!.nombre} ${alumnoActual!.apellido}'
                : 'Cargando...',
            style: const TextStyle(fontSize: 22, color: Colors.blueGrey),
          ),
          const SizedBox(height: 24),
          SizedBox(
            height: 150,
            child: Lottie.asset(
              'lib/assets/animations/book.json',
              controller: _controller,
              onLoaded: (composition) {
                _controller
                  ..duration = composition.duration
                  ..forward();
              },
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: const Text('Aula Inteligente'),
          backgroundColor: Colors.blueGrey,
        ),
        body: Container(
          padding: const EdgeInsets.all(16),
          color: const Color(0xFFF4F4F4),
          child: _buildMainContent(),
        ),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.blueGrey,
          selectedItemColor: Colors.white,
          unselectedItemColor: Colors.white70,
          currentIndex: _getIndexForRoute(_currentRoute),
          onTap: (index) {
            setState(() {
              _currentRoute = _getRouteForIndex(index);
              if (_currentRoute == '/inicio') {
                _controller.reset();
                _controller.forward();
              }
            });
          },
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Inicio'),
            BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Materias'),
            BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Desempeño'),
            BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Información'),
          ],
        ),
      ),
    );
  }

  int _getIndexForRoute(String route) {
    switch (route) {
      case '/inicio':
        return 0;
      case '/materiaAlumno':
        return 1;
      case '/desempeno':
        return 2;
      case '/informacion':
        return 3;
      default:
        return 0;
    }
  }

  String _getRouteForIndex(int index) {
    switch (index) {
      case 0:
        return '/inicio';
      case 1:
        return '/materiaAlumno';
      case 2:
        return '/desempeno';
      case 3:
        return '/informacion';
      default:
        return '/inicio';
    }
  }

  Future<bool> _onWillPop() async {
    bool? shouldClose = await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cerrar sesión'),
        content: const Text('¿Deseas cerrar sesión?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(true);
            },
            child: const Text('Aceptar'),
          ),
        ],
      ),
    );
    if (shouldClose == true) {
      await LoginService().logout();
      Navigator.of(context).pushReplacementNamed('/login');
      return false;
    }
    return false;
  }
}
