from rest_framework import serializers
from usuarios.models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'tipo_usuario', 'estado']


class LoginSerializer(serializers.Serializer):
    """
    Serializer para manejar los datos de inicio de sesión del usuario.

    Campos:
        username (str): Nombre de usuario.
        password (str): Contraseña del usuario.
    """
    username = serializers.CharField()
    password = serializers.CharField()


class RegisterSerializer(serializers.Serializer):
    """
    Serializer para manejar el registro de nuevos usuarios.

    Campos:
        username (str): Nombre de usuario único.
        password (str): Contraseña del usuario.
        email (str): Correo electrónico del usuario.
        tipo_usuario (str): Rol asignado al usuario (admin, cliente, etc.).
        estado (str): Estado del usuario (activo, inactivo).
    """
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.CharField()
    tipo_usuario = serializers.CharField()
    estado = serializers.CharField()
