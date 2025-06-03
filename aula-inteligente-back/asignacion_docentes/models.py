from django.db import models
from gestiones.models import Gestion
from materias.models import Materia
from docentes.models import Docente

# Create your models here.


class Asignacion_docente(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    materia = models.ForeignKey(
        Materia, on_delete=models.CASCADE, related_name='asignacion_docente')
    docente = models.ForeignKey(
        Docente, on_delete=models.CASCADE, related_name='asignacion_docente')
    gestion = models.ForeignKey(
        Gestion, on_delete=models.CASCADE, related_name='asignacion_docente')

    class Meta:
        db_table = 'asignacion_docente'
