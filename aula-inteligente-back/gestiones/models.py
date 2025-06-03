from django.db import models

# Create your models here.


class Gestion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    estado = models.CharField(max_length=30)
    fecha_inicio = models.DateField()
    fecha_culminacion = models.DateField()

    class Meta:
        db_table = 'gestion'
