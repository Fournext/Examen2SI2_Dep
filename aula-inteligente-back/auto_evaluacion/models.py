from django.db import models

from estudiantes.models import Estudiante
from materias.models import Materia
from trimestre.models import Trimestre

# Create your models here.
class AutoEvaluacion(models.Model):
    id = models.AutoField(primary_key=True)
    nota = models.FloatField(null=True, blank=True)
    descripcion = models.CharField(max_length=255)
    poderacion = models.FloatField(null=True, blank=True)
    trimestre = models.ForeignKey(
        Trimestre, on_delete=models.CASCADE, related_name='auto_evaluaciones')
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name='auto_evaluaciones'
    )
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='auto_evaluaciones'
    )

    class Meta:
        db_table = 'auto_evaluacion'  