from django.db import models

from estudiantes.models import Estudiante
from materias.models import Materia
from trimestre.models import Trimestre

# Create your models here.
class Tarea(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    tipo = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    nota = models.FloatField(null=True, blank=True)
    trimestre = models.ForeignKey(
        Trimestre, on_delete=models.CASCADE, related_name='tareas')
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name='tareas'
    )
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='tareas'
    )

    class Meta:
        db_table = 'tarea'  