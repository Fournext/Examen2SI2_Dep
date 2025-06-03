from rest_framework import serializers
from aulas.models import Aula


class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = ['id', 'codigo', 'capacidad', 'estado']
