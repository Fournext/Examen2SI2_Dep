from django.db import models
from niveles.models import Nivel


class Materia(models.Model):
    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=30)
    nombre = models.CharField(max_length=100)
    carga_horaria = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=30)
    nivel = models.ForeignKey(
        Nivel, on_delete=models.CASCADE, related_name='materias')

    class Meta:
        db_table = 'materia'
