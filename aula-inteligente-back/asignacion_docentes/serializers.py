from rest_framework import serializers
from asignacion_docentes.models import Asignacion_docente


class Asignacion_docente_serializer(serializers.ModelSerializer):
    materia_nombre = serializers.CharField(
        source='materia.nombre', read_only=True)
    docente_nombre_completo = serializers.SerializerMethodField()
    gestion_nombre = serializers.CharField(
        source='gestion.nombre', read_only=True)

    class Meta:
        model = Asignacion_docente
        fields = ['id', 'fecha', 'materia', 'materia_nombre', 'docente',
                  'docente_nombre_completo', 'gestion', 'gestion_nombre']

    def get_docente_nombre_completo(self, obj):
        return f"{obj.docente.nombre} {obj.docente.apellido}" if obj.docente else ""
