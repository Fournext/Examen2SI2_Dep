import pandas as pd
import joblib
from rest_framework.response import Response
from rest_framework.decorators import api_view
from boletin_materia.models import BoletinMateria
from materias.models import Materia
from estudiantes.models import Estudiante

# Carga el modelo solo una vez
modelo = joblib.load("modelo_boletin.pkl")

@api_view(['GET'])
def predecir_estudiante(request, estudiante_id):
    boletines = BoletinMateria.objects.filter(estudiante_id=estudiante_id).select_related('materia', 'trimestre')
    
    if not boletines.exists():
        return Response({"error": "No hay datos para el estudiante"}, status=404)

    df = pd.DataFrame([{
        "materia": b.materia.nombre,
        "trimestre": b.trimestre.nombre,
        "ser": b.ser,
        "saber": b.saber,
        "hacer": b.hacer,
        "decidir": b.decidir,
        "promedio": (b.ser + b.saber + b.hacer + b.decidir) / 4
    } for b in boletines])

    predicciones = {}

    for materia, grupo in df.groupby("materia"):
        grupo = grupo.copy()
        grupo["trimestre_nro"] = grupo["trimestre"].str.extract(r'(\d+)').astype(int)
        grupo = grupo.sort_values(by="trimestre_nro")

        if len(grupo) < 3:
            continue

        ultimos = grupo.tail(3)[["ser", "saber", "hacer", "decidir", "promedio"]].values.flatten()

        if len(ultimos) == 15:
            pred = modelo.predict([ultimos])[0]
            predicciones[materia] = round(pred, 2)

    if not predicciones:
        return Response({"error": "No hay suficientes datos para predecir."}, status=400)

    return Response({
        "estudiante_id": estudiante_id,
        "predicciones": predicciones
    })
