import 'package:aula_inteligente/services/prediccion_services.dart';
import 'package:flutter/material.dart';
import 'package:aula_inteligente/models/trimestre_modelo.dart';
import 'package:aula_inteligente/models/boletin_materia_modelo.dart';
import 'package:aula_inteligente/services/trimestre_services.dart';
import 'package:aula_inteligente/services/boletin_materia_service.dart';
import 'package:aula_inteligente/services/alumno_services.dart';

class MateriaAlumnoScreen extends StatefulWidget {
  const MateriaAlumnoScreen({super.key});

  @override
  State<MateriaAlumnoScreen> createState() => _MateriaAlumnoScreenState();
}

class _MateriaAlumnoScreenState extends State<MateriaAlumnoScreen> {
  final TrimestreService _trimestreService = TrimestreService();
  final BoletinMateriaService _boletinService = BoletinMateriaService();
  final AlumnoService _alumnoService = AlumnoService();
  final PrediccionesService _prediccionesService = PrediccionesService();

  List<Trimestre> _todosTrimestres = [];
  List<Trimestre> _trimestresFiltrados = [];

  int? _anioSeleccionado;
  Trimestre? _trimestreSeleccionado;
  List<BoletinMateria> _materiasFiltradas = [];
  Map<String, double> _predicciones = {};

  int? _idEstudiante;

  @override
  void initState() {
    super.initState();
    _cargarTodo();
  }

  Future<void> _cargarTodo() async {
    final alumno = await _alumnoService.obtenerAlumnoActual();
    final trimestres = await _trimestreService.listarTrimestres();

    if (alumno != null) {
      if (!mounted) return;
      setState(() {
        _idEstudiante = alumno.id;
        _todosTrimestres = trimestres;
        _anioSeleccionado =
            trimestres.map((t) => DateTime.parse(t.fechaInicio).year).toSet().first;
        _filtrarTrimestres();
      });
    }
  }

  void _filtrarTrimestres() {
    if (_anioSeleccionado != null) {
      _trimestresFiltrados = _todosTrimestres.where((t) {
        return DateTime.parse(t.fechaInicio).year == _anioSeleccionado;
      }).toList();

      if (!_trimestresFiltrados.contains(_trimestreSeleccionado)) {
        _trimestreSeleccionado = _trimestresFiltrados.isNotEmpty ? _trimestresFiltrados.first : null;
      }

      setState(() {});
      _filtrarMaterias();
    }
  }

  Future<void> _filtrarMaterias() async {
    if (_trimestreSeleccionado == null || _idEstudiante == null) return;

    final todosBoletines = await _boletinService.listarBoletines();
    final filtrados = _boletinService.filtrarBoletines(
      boletines: todosBoletines,
      idTrimestre: _trimestreSeleccionado!.id,
      idEstudiante: _idEstudiante!,
    );

    if (filtrados.isEmpty) {
      final predicciones = await _prediccionesService.obtenerPredicciones(_idEstudiante!);
      setState(() {
        _materiasFiltradas = [];
        _predicciones = predicciones?.predicciones ?? {};
      });
    } else {
    if (!mounted) return;
      setState(() {
        _materiasFiltradas = filtrados;
        _predicciones = {};
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final anios = _todosTrimestres
        .map((t) => DateTime.parse(t.fechaInicio).year)
        .toSet()
        .toList()
      ..sort();

    final materiasUnificadas = _materiasFiltradas.map((e) => e.materiaNombre!).toSet().toList()
      ..addAll(_predicciones.keys.where((materia) =>
          !_materiasFiltradas.any((b) => b.materiaNombre == materia)));

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: DropdownButton<int>(
                  isExpanded: true,
                  hint: const Text('Año'),
                  value: _anioSeleccionado,
                  items: anios.map((anio) {
                    return DropdownMenuItem<int>(
                      value: anio,
                      child: Text(anio.toString()),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _anioSeleccionado = value;
                      _filtrarTrimestres();
                    });
                  },
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: DropdownButton<Trimestre>(
                  isExpanded: true,
                  hint: const Text('Trimestre'),
                  value: _trimestreSeleccionado,
                  items: _trimestresFiltrados.map((t) {
                    return DropdownMenuItem<Trimestre>(
                      value: t,
                      child: Text(t.nombre),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _trimestreSeleccionado = value;
                      _filtrarMaterias();
                    });
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Expanded(
            child: GridView.builder(
              itemCount: materiasUnificadas.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 8.0,
                mainAxisSpacing: 8.0,
                childAspectRatio: 3 / 2,
              ),
              itemBuilder: (context, index) {
                final materiaNombre = materiasUnificadas[index];
                final boletin = _materiasFiltradas.firstWhere(
                  (b) => b.materiaNombre == materiaNombre,
                  orElse: () => BoletinMateria(
                    materiaNombre: materiaNombre,
                    ser: 0,
                    saber: 0,
                    hacer: 0,
                    decidir: 0,
                    trimestre: 0,
                    estudiante: 0,
                    materia: 0,
                  ),
                );
                final esPrediccion = !_materiasFiltradas.any((b) => b.materiaNombre == materiaNombre);
                final notaPredictiva = _predicciones[materiaNombre] ?? 0;

                // Color según nota predictiva
                Color? colorFondo;
                if (esPrediccion) {
                  colorFondo = notaPredictiva >= 51 ? Colors.green[100] : Colors.red[100];
                }

                return Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  elevation: 4,
                  color: colorFondo,
                  child: InkWell(
                    onTap: () {
                      if (esPrediccion) {
                        showDialog(
                          context: context,
                          builder: (_) => AlertDialog(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            title: Text('🔮 $materiaNombre'),
                            content: Text(
                              'Nota Predictiva: ${notaPredictiva.toStringAsFixed(2)}',
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            actions: [
                              TextButton(
                                onPressed: () => Navigator.pop(context),
                                child: const Text('Cerrar'),
                              ),
                            ],
                          ),
                        );
                      } else {
                        final total = boletin.ser + boletin.saber + boletin.hacer + boletin.decidir;

                        Color colorTotal;
                        if (total < 50) {
                          colorTotal = Colors.red;
                        } else if (total >= 51) {
                          colorTotal = Colors.green;
                        } else {
                          colorTotal = Colors.grey;
                        }

                        showDialog(
                          context: context,
                          builder: (_) => AlertDialog(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            title: Text(boletin.materiaNombre ?? 'Detalle de materia'),
                            content: Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Ser: ${boletin.ser.toStringAsFixed(2)}'),
                                Text('Saber: ${boletin.saber.toStringAsFixed(2)}'),
                                Text('Hacer: ${boletin.hacer.toStringAsFixed(2)}'),
                                Text('Decidir: ${boletin.decidir.toStringAsFixed(2)}'),
                                const Divider(),
                                Text(
                                  'Total: ${total.toStringAsFixed(2)}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: colorTotal,
                                    fontSize: 16,
                                  ),
                                ),
                              ],
                            ),
                            actions: [
                              TextButton(
                                onPressed: () => Navigator.pop(context),
                                child: const Text('Cerrar'),
                              ),
                            ],
                          ),
                        );
                      }
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Center(
                        child: Text(
                          esPrediccion ? '🔮 $materiaNombre' : materiaNombre,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.blueGrey,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
