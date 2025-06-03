from rest_framework import serializers
from docentes.models import Docente


class DocenteSerializer(serializers.ModelSerializer):
    asignacion_docente = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Docente
        fields = ['id', 'nombre', 'apellido', 'carnet', 'telefono',
                  'turno', 'fecha_nacimiento', 'especialidad', 'fecha_contratacion', 'asignacion_docente','usuario', 'usuario_username']
