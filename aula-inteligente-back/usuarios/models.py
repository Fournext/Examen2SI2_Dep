"""Users

Este módulo define el modelo de Usuario con sus métodos personalizados
para manejar contraseñas y su representación en texto.
"""

from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class Usuario(models.Model):
    """
    Modelo que representa un usuario en el sistema.

    Atributos:
        id (int): Identificador único del usuario.
        username (str): Nombre de usuario único.
        password (str): Contraseña en formato hash.
        email (str): Correo electrónico del usuario.
        tipo_usuario (str): Rol o tipo asignado al usuario (admin, cliente, etc.).
        estado (str): Estado del usuario (activo, inactivo).
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    tipo_usuario = models.CharField(max_length=20)
    estado = models.CharField(max_length=30)

    def set_password(self, raw_password: str) -> None:
        """
        Asigna una contraseña al usuario, generando su hash.

        Args:
            raw_password (str): La contraseña sin encriptar.
        """
        self.password = make_password(raw_password)

    def check_password(self, raw_password: str) -> bool:
        """
        Verifica si la contraseña proporcionada coincide con el hash almacenado.

        Args:
            raw_password (str): Contraseña sin encriptar a validar.

        Returns:
            bool: True si la contraseña es válida, False en caso contrario.
        """
        return check_password(raw_password, self.password)

    def __str__(self) -> str:
        """
        Devuelve una representación legible del usuario.

        Returns:
            str: El nombre de usuario.
        """
        return str(self.username)

    class Meta:
        """
        Configuracion adicional del modelo Usuario.
        Atributos:
             db_table(str): Nombre de la tabla en la base de datos evita 
             que django lo genere automaticamente
        """
        db_table = 'usuario'
