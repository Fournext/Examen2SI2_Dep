from django.db import models

from estudiantes.models import Estudiante
from materias.models import Materia
from trimestre.models import Trimestre

# Create your models here.
class BoletinMateria(models.Model):
    id = models.AutoField(primary_key=True)
    ser = models.FloatField(null=True, blank=True)
    saber = models.FloatField(null=True, blank=True)
    hacer = models.FloatField(null=True, blank=True)
    decidir = models.FloatField(null=True, blank=True)
    trimestre = models.ForeignKey(
        Trimestre, on_delete=models.CASCADE, related_name='boletin_materias')
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE, related_name='boletin_materias'
    )
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='boletin_materias'
    )

    class Meta:
        db_table = 'boletin_materia'  