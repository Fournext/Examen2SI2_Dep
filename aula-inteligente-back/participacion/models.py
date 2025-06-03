from django.db import models

from estudiantes.models import Estudiante
from materias.models import Materia
from trimestre.models import Trimestre

# Create your models here.
class Participacion(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    detalle = models.CharField(max_length=255)
    trimestre = models.ForeignKey(
        Trimestre, on_delete=models.CASCADE, related_name='participaciones')
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name='participaciones'
    )
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='participaciones'
    )

    class Meta:
        db_table = 'participacion'  