from rest_framework import serializers
from .models import Evaluacion

class EvaluacionSerializer(serializers.ModelSerializer):
    trimestre_nombre = serializers.CharField(source='trimestre.nombre', read_only=True)
    estudiante_nombre = serializers.CharField(source='estudiante.nombre', read_only=True)
    estudiante_apellido = serializers.CharField(source='estudiante.apellido', read_only=True)
    materia_nombre = serializers.CharField(source='materia.nombre', read_only=True)

    class Meta:
        model = Evaluacion
        fields = [
            'id', 'tipo', 'nota', 'descripcion', 'poderacion', 'trimestre', 'estudiante', 'materia',
            'trimestre_nombre', 'estudiante_nombre','estudiante_apellido', 'materia_nombre'
        ]
