import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:aula_inteligente/models/trimestre_modelo.dart';
import 'package:aula_inteligente/services/desempeno_alumno_service.dart';
import 'package:aula_inteligente/services/prediccion_services.dart';

class DesempenoAlumnoScreen extends StatefulWidget {
  const DesempenoAlumnoScreen({super.key});

  @override
  State<DesempenoAlumnoScreen> createState() => _DesempenoAlumnoScreenState();
}

class _DesempenoAlumnoScreenState extends State<DesempenoAlumnoScreen> {
  final DesempenoAlumnoService _service = DesempenoAlumnoService();
  final PrediccionesService _prediccionesService = PrediccionesService();

  List<Trimestre> _todosTrimestres = [];
  List<Trimestre> _trimestresDelAnio = [];
  Map<int, double> _promediosPorTrimestre = {};
  Map<String, double> _notasPrevistas = {};

  List<int> _aniosDisponibles = [];
  int? _anioSeleccionado;
  int? _idEstudiante;
  bool _cargando = true;

  @override
  void initState() {
    super.initState();
    _cargarDatosIniciales();
  }

  Future<void> _cargarDatosIniciales() async {
    _idEstudiante = await _service.obtenerIdEstudiante();
    _todosTrimestres = await _service.obtenerTrimestres();
    _aniosDisponibles = _service.obtenerAnios(_todosTrimestres);
    _anioSeleccionado = _aniosDisponibles.isNotEmpty ? _aniosDisponibles.first : DateTime.now().year;
    await _cargarPromediosPorAnio();
  }

  Future<void> _cargarPromediosPorAnio() async {
    if (_anioSeleccionado == null || _idEstudiante == null) return;

    setState(() => _cargando = true);

    _trimestresDelAnio = _service.filtrarTrimestresPorAnio(_todosTrimestres, _anioSeleccionado!);
    _promediosPorTrimestre =
        await _service.obtenerPromediosPorTrimestre(_idEstudiante!, _trimestresDelAnio);

    final prediccion = await _prediccionesService.obtenerPredicciones(_idEstudiante!);
    _notasPrevistas = prediccion?.predicciones ?? {};

    setState(() => _cargando = false);
  }

  double obtenerNotaTrimestre(int index, Trimestre trimestre) {
    if (_promediosPorTrimestre.containsKey(trimestre.id)) {
      return _promediosPorTrimestre[trimestre.id]!;
    }

    // Si hay predicción, tomar promedio de todas las materias
    if (_notasPrevistas.isNotEmpty) {
      final valores = _notasPrevistas.values.toList();
      final suma = valores.reduce((a, b) => a + b);
      return suma / valores.length;
    }

    return 0;
  }


  bool esNotaPrevista(int index, Trimestre trimestre) {
    return !_promediosPorTrimestre.containsKey(trimestre.id) &&
           index < _notasPrevistas.values.length;
  }

  @override
  Widget build(BuildContext context) {
    final maxY = (_promediosPorTrimestre.values.isNotEmpty
            ? _promediosPorTrimestre.values.reduce((a, b) => a > b ? a : b)
            : (_notasPrevistas.values.isNotEmpty
                ? _notasPrevistas.values.reduce((a, b) => a > b ? a : b)
                : 100)) *
        1.2;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Desempeño del Alumno'),
        backgroundColor: Colors.blueGrey,
        automaticallyImplyLeading: false,
      ),
      body: _cargando
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  DropdownButton<int>(
                    isExpanded: true,
                    value: _anioSeleccionado,
                    items: _aniosDisponibles.map((anio) {
                      return DropdownMenuItem<int>(
                        value: anio,
                        child: Text('Año $anio'),
                      );
                    }).toList(),
                    onChanged: (value) async {
                      if (value != null) {
                        setState(() {
                          _anioSeleccionado = value;
                          _cargando = true;
                        });
                        await _cargarPromediosPorAnio();
                      }
                    },
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                    child: BarChart(
                      BarChartData(
                        alignment: BarChartAlignment.spaceAround,
                        maxY: maxY.clamp(20, 100),
                        barTouchData: BarTouchData(
                          enabled: true,
                          touchTooltipData: BarTouchTooltipData(
                            tooltipBgColor: Colors.blueGrey,
                            getTooltipItem: (group, groupIndex, rod, rodIndex) {
                              final trimestre = _trimestresDelAnio[group.x.toInt()];
                              final esPrevista = esNotaPrevista(group.x.toInt(), trimestre);
                              return BarTooltipItem(
                                '${rod.toY.toStringAsFixed(2)}${esPrevista ? ' (prevista)' : ''}',
                                const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              );
                            },
                          ),
                        ),
                        titlesData: FlTitlesData(
                          leftTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              reservedSize: 20,
                              getTitlesWidget: (value, meta) {
                                return Text(
                                  value.toInt().toString(),
                                  style: const TextStyle(fontSize: 12),
                                  textAlign: TextAlign.right,
                                );
                              },
                            ),
                          ),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              reservedSize: 40,
                              getTitlesWidget: (value, meta) {
                                final index = value.toInt();
                                final trimestre = _trimestresDelAnio[index];
                                final esPrevista = esNotaPrevista(index, trimestre);
                                return Text(
                                  'T${index + 1}${esPrevista ? "*" : ""}',
                                  style: const TextStyle(fontSize: 12),
                                );
                              },
                            ),
                          ),
                          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                        ),
                        gridData: FlGridData(show: true),
                        borderData: FlBorderData(show: true),
                        barGroups: List.generate(_trimestresDelAnio.length, (index) {
                          final trimestre = _trimestresDelAnio[index];
                          final valor = obtenerNotaTrimestre(index, trimestre);
                          final esPrediccion = esNotaPrevista(index, trimestre);

                          return BarChartGroupData(
                            x: index,
                            barRods: [
                              BarChartRodData(
                                toY: valor,
                                width: 22,
                                borderRadius: BorderRadius.circular(4),
                                color: esPrediccion
                                  ? Colors.orange
                                  : (valor >= 51 ? Colors.green : Colors.red),
                              ),
                            ],
                            showingTooltipIndicators: [0],
                          );
                        }),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Leyenda
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(width: 12, height: 12, color: Colors.orange),
                      const SizedBox(width: 6),
                      const Text('Nota prevista', style: TextStyle(fontSize: 12)),
                      const SizedBox(width: 10),
                      Container(width: 12, height: 12, color: Colors.green),
                      const SizedBox(width: 4),
                      const Text('Nota real ≥ 51', style: TextStyle(fontSize: 12)),
                      const SizedBox(width: 4),
                      Container(width: 12, height: 12, color: Colors.red),
                      const SizedBox(width: 4),
                      const Text('Nota real < 51', style: TextStyle(fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Detalle
                  ..._trimestresDelAnio.asMap().entries.map((entry) {
                    final index = entry.key;
                    final trimestre = entry.value;
                    final valor = obtenerNotaTrimestre(index, trimestre);
                    final esPrediccion = esNotaPrevista(index, trimestre);
                    return Text(
                      '${trimestre.nombre}: ${valor.toStringAsFixed(2)}${esPrediccion ? " (prevista)" : ""}',
                      style: TextStyle(
                        fontSize: 14,
                        color: esPrediccion ? Colors.redAccent : Colors.black,
                      ),
                    );
                  }),
                  const SizedBox(height: 12),
                  Text(
                    calcularPromedioAnual(),
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueGrey,
                    ),
                  ),

                ],
              ),
            ),
    );
  }
  String calcularPromedioAnual() {
  double suma = 0;
  int cantidad = 0;
  bool incluyePrevista = false;

  for (int i = 0; i < _trimestresDelAnio.length; i++) {
    final trimestre = _trimestresDelAnio[i];
    final valor = obtenerNotaTrimestre(i, trimestre);
    final esPrevista = esNotaPrevista(i, trimestre);

    suma += valor;
    cantidad++;
    if (esPrevista) incluyePrevista = true;
  }

  if (cantidad == 0) return "Sin datos";

  final promedio = suma / cantidad;
  return "${incluyePrevista ? 'Promedio Total previsto' : 'Promedio Total real'}: ${promedio.toStringAsFixed(2)}";
}

}
