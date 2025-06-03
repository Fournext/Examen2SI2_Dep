from django.db import models
from gestiones.models import Gestion
from niveles.models import Nivel
from usuarios.models import Usuario

# Create your models here.


class Estudiante(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    carnet_estudiante = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(max_length=255)
    rude = models.CharField(max_length=20)
    estado = models.CharField(max_length=30)
    telefono_apoderado = models.CharField(max_length=50)
    nombre_apoderado = models.CharField(max_length=255)
    apellido_apoderado = models.CharField(max_length=255)
    carnet_apoderado = models.CharField(max_length=20)
    gestion = models.ForeignKey(
        Gestion, on_delete=models.CASCADE, related_name='estudiantes')
    nivel = models.ForeignKey(
        Nivel, on_delete=models.CASCADE, related_name='estudiantes')
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, related_name='estudiantes')

    class Meta:
        db_table = 'estudiante'
