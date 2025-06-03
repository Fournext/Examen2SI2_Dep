from rest_framework import serializers
from estudiantes.models import Estudiante


class EstudianteSerializer(serializers.ModelSerializer):
    nivel_nombre = serializers.CharField(
        source='nivel.descripcion', read_only=True)
    gestion_nombre = serializers.CharField(
        source='gestion.nombre', read_only=True)
    usuario_username = serializers.CharField(
        source='usuario.username', read_only=True)

    class Meta:
        model = Estudiante
        fields = ['id', 'nombre', 'apellido', 'carnet_estudiante', 'fecha_nacimiento','direccion', 'rude', 'estado', 
                  'telefono_apoderado', 'nombre_apoderado', 'apellido_apoderado', 'carnet_apoderado', 'gestion', 
                  'gestion_nombre', 'nivel', 'nivel_nombre','usuario','usuario_username']
