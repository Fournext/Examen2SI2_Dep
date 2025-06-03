import datetime
from functools import wraps  # ← estándar antes que terceros

import jwt  # ← librerías de terceros
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

from .models import Usuario  # ← importación local del proyecto


def jwt_required(view_func):
    """
    Decorador que verifica la validez de un token JWT en la cabecera de autorización.

    Si el token es válido, agrega el usuario a `request.user` y permite el acceso a la vista.
    Si es inválido, retorna una respuesta HTTP con el error correspondiente.

    Args:
        view_func (function): Vista protegida que requiere autenticación.

    Returns:
        function: Vista protegida con validación JWT.
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return Response({'error': 'Token no proporcionado'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=["HS256"])
            user = Usuario.objects.get(  # pylint: disable=no-member
                id=payload['id'])  # pylint: disable=no-member
            request.user = user
        except jwt.ExpiredSignatureError:
            return Response({'error': 'El token ha expirado'}, status=status.HTTP_401_UNAUTHORIZED)
        except (jwt.InvalidTokenError, IndexError):
            return Response({'error': 'Token inválido'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:   # pylint: disable=no-member
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        return view_func(request, *args, **kwargs)

    return wrapper


def generate_jwt(user):
    """
    Genera un token JWT válido para el usuario autenticado.

    Args:
        user (Usuario): Instancia del modelo de usuario autenticado.

    Returns:
        str: Token JWT codificado con los datos del usuario.
    """
    payload = {
        'id': user.id,
        'username': user.username,
        'role': user.tipo_usuario,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token
