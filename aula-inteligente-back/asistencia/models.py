from django.db import models

from estudiantes.models import Estudiante
from materias.models import Materia
from trimestre.models import Trimestre

# Create your models here.
class Asistencia(models.Model):
    id = models.AutoField(primary_key=True)
    hora_entrada = models.DateTimeField()
    justificacion = models.CharField(max_length=255)
    trimestre = models.ForeignKey(
        Trimestre, on_delete=models.CASCADE, related_name='asistencias')
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name='asistencias'
    )
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='asistencias'
    )

    class Meta:
        db_table = 'asistencia'  