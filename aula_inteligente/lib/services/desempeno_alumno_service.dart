import 'package:aula_inteligente/models/trimestre_modelo.dart';
import 'package:aula_inteligente/services/alumno_services.dart';
import 'package:aula_inteligente/services/trimestre_services.dart';
import 'package:aula_inteligente/services/boletin_materia_service.dart';
import 'package:aula_inteligente/services/prediccion_services.dart';

class DesempenoAlumnoService {
  final _alumnoService = AlumnoService();
  final _trimestreService = TrimestreService();
  final _boletinService = BoletinMateriaService();
  final _prediccionesService = PrediccionesService();

  Future<int?> obtenerIdEstudiante() async {
    final alumno = await _alumnoService.obtenerAlumnoActual();
    return alumno?.id;
  }

  Future<List<Trimestre>> obtenerTrimestres() async {
    return await _trimestreService.listarTrimestres();
  }

  List<int> obtenerAnios(List<Trimestre> trimestres) {
    return trimestres
        .map((t) => DateTime.parse(t.fechaInicio).year)
        .toSet()
        .toList()
      ..sort();
  }

  List<Trimestre> filtrarTrimestresPorAnio(List<Trimestre> trimestres, int anio) {
    return trimestres
        .where((t) => DateTime.parse(t.fechaInicio).year == anio)
        .toList()
      ..sort((a, b) => a.fechaInicio.compareTo(b.fechaInicio));
  }

 Future<Map<int, double>> obtenerPromediosPorTrimestre(int idEstudiante, List<Trimestre> trimestresDelAnio) async {
    final boletines = await _boletinService.listarBoletines();
    final boletinesAlumno = boletines.where((b) => b.estudiante == idEstudiante).toList();

    final Map<int, double> promedios = {};

    for (final trimestre in trimestresDelAnio) {
      final boletinesTrimestre = boletinesAlumno.where((b) => b.trimestre == trimestre.id).toList();

      if (boletinesTrimestre.isNotEmpty) {
        final suma = boletinesTrimestre
            .map((b) => b.ser + b.saber + b.hacer + b.decidir)
            .reduce((a, b) => a + b);
        final promedio = suma / boletinesTrimestre.length;
        promedios[trimestre.id!] = promedio;
      }
    }

    return promedios;
  }

  Future<Map<String, double>> obtenerPromediosPrevistos(int idEstudiante) async {
    final pred = await _prediccionesService.obtenerPredicciones(idEstudiante);
    return pred?.predicciones ?? {};
  }


  bool esNotaPrevista(int trimestreId, List<int> trimestresConDatos) {
    return !trimestresConDatos.contains(trimestreId);
  }

}
