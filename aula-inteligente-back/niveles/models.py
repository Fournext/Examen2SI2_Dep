from django.db import models
from aulas.models import Aula
# Create your models here.


class Nivel(models.Model):
    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)
    aula = models.OneToOneField(
        Aula, on_delete=models.CASCADE, related_name='nivel')

    class Meta:
        db_table = 'nivel'
