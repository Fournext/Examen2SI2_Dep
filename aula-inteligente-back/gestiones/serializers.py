from rest_framework import serializers
from gestiones.models import Gestion


class GestionSerializer(serializers.ModelSerializer):
    asignacion_docente = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    estudiantes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Gestion
        fields = ['id', 'nombre', 'estado',
                  'fecha_inicio', 'fecha_culminacion', 'asignacion_docente', 'estudiantes']
