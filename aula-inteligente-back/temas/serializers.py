from rest_framework import serializers
from temas.models import Tema


class TemaSerializer(serializers.ModelSerializer):
    materia_nombre = serializers.CharField(
        source='materia.nombre', read_only=True)

    class Meta:
        model = Tema
        fields = ['id', 'nombre', 'codigo',
                  'duracion', 'materia', 'materia_nombre']
