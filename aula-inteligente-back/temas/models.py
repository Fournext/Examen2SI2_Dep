from django.db import models
from materias.models import Materia

# Create your models here.


class Tema(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    codigo = models.CharField(max_length=30)
    duracion = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=30)
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='temas')

    class Meta:
        db_table = 'tema'
