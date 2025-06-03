"""
urls.py del módulo usuarios

Define las rutas disponibles para el módulo de autenticación y gestión de usuarios.

Rutas:
    - /login/     : Inicia sesión y devuelve un token JWT si las credenciales son válidas.
    - /register/  : Registra un nuevo usuario con los datos enviados.
    - /getuser/   : Retorna los datos de un usuario a partir del parámetro de consulta `id`.

Cada ruta está asociada a una vista definida en `usuarios.views`.
"""

from django.urls import path
from usuarios.views import login, register, obtener_usuario_por_id

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('getuser/', obtener_usuario_por_id, name='getuser'),
]
