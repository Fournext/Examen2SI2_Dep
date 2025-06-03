from django.db import models

from usuarios.models import Usuario

# Create your models here.


class Docente(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    carnet = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20)
    turno = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    especialidad = models.CharField(max_length=255)
    fecha_contratacion = models.DateField()
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, related_name='docentes')

    class Meta:
        db_table = 'docente'
