from rest_framework import serializers
from .models import Trimestre

class TrimestreSerializer(serializers.ModelSerializer):
    gestion_nombre = serializers.CharField(source='gestion.nombre', read_only=True)

    class Meta:
        model = Trimestre
        fields = ['id', 'nombre', 'fecha_inicio', 'fecha_culminacion', 'gestion', 'gestion_nombre']
