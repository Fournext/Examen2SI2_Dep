from django.db import models

from gestiones.models import Gestion

# Create your models here.
class Trimestre(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_culminacion = models.DateField()
    gestion = models.ForeignKey(
        Gestion, on_delete=models.CASCADE, related_name='trimestres')

    class Meta:
        db_table = 'trimestre'