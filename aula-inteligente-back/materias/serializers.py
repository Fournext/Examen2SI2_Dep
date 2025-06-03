from rest_framework import serializers
from materias.models import Materia
from niveles.models import Nivel


class MateriaSerializer(serializers.ModelSerializer):
    nivel_descripcion = serializers.CharField(
        source='nivel.descripcion', read_only=True)
    temas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    asignacion_docente = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)

    class Meta:
        model = Materia
        fields = ['id', 'codigo', 'nombre',
                  'carga_horaria', 'estado', 'nivel', 'nivel_descripcion', 'temas', 'asignacion_docente']
