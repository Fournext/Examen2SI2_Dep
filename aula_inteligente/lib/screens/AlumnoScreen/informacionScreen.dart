import 'package:flutter/material.dart';
import 'package:aula_inteligente/models/alumno_model.dart';
import 'package:aula_inteligente/services/alumno_services.dart';

class InformacionScreen extends StatefulWidget {
  const InformacionScreen({super.key});

  @override
  State<InformacionScreen> createState() => _InformacionScreenState();
}

class _InformacionScreenState extends State<InformacionScreen> {
  final AlumnoService _alumnoService = AlumnoService();
  Alumno? _alumno;
  bool _cargando = true;

  @override
  void initState() {
    super.initState();
    _cargarAlumno();
  }

  Future<void> _cargarAlumno() async {
    final alumno = await _alumnoService.obtenerAlumnoActual();
    setState(() {
      _alumno = alumno;
      _cargando = false;
    });
  }

  Widget _dato(String titulo, String valor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$titulo: ',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Expanded(
            child: Text(valor),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false, // 🔴 Oculta el botón de retroceso
        title: const Text('Información del Estudiante'),
        backgroundColor: Colors.blueGrey,
      ),
      body: _cargando
          ? const Center(child: CircularProgressIndicator())
          : _alumno == null
              ? const Center(child: Text('No se pudo cargar la información.'))
              : Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: ListView(
                    children: [
                      const Text(
                        'Datos Personales',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      _dato('Nombre', '${_alumno!.nombre} ${_alumno!.apellido}'),
                      _dato('Carnet de Estudiante', _alumno!.carnetEstudiante),
                      _dato('Fecha de Nacimiento', _alumno!.fechaNacimiento),
                      _dato('Dirección', _alumno!.direccion),
                      _dato('RUDE', _alumno!.rude),
                      _dato('Estado', _alumno!.estado),
                      _dato('Gestión', _alumno!.gestionNombre.toString()),
                      _dato('Nivel', _alumno!.nivelNombre.toString()),
                      const Divider(height: 32),
                      const Text(
                        'Apoderado',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      _dato('Nombre', '${_alumno!.nombreApoderado} ${_alumno!.apellidoApoderado}'),
                      _dato('Carnet', _alumno!.carnetApoderado),
                      _dato('Teléfono', _alumno!.telefonoApoderado),
                    ],
                  ),
                ),
    );
  }
}
