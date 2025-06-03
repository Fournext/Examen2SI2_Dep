from rest_framework import serializers
from niveles.models import Nivel
from aulas.models import Aula
from materias.models import Materia


class NivelSerializer(serializers.ModelSerializer):
    aula = serializers.PrimaryKeyRelatedField(
        queryset=Aula.objects.all())  # pylint: disable=no-member
    materias = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    estudiantes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Nivel
        fields = ['id', 'codigo', 'descripcion',
                  'aula', 'materias', 'estudiantes']
