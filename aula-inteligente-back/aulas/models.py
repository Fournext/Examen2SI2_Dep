from django.db import models


class Aula(models.Model):
    """
    Modelo que representa un aula dentro del sistema educativo.

    Atributos:
        id (int): Identificador único del aula (clave primaria).
        codigo (str): Código identificador del aula (ej. "A-101").
        capacidad (int): Número máximo de personas que puede albergar el aula.
    """
    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=50)
    capacidad = models.IntegerField()
    estado = models.CharField(max_length=30)

    class Meta:
        """
        Configuración interna del modelo Aula.

        Atributos:
            db_table (str): Nombre de la tabla en la base de datos asociada al modelo ('aula').
        """
        db_table = 'aula'
