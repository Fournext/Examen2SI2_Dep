from django.urls import path
from .views import listar_participaciones, crear_participacion, obtener_participacion, actualizar_participacion, eliminar_participacion

urlpatterns = [
    path('listar/', listar_participaciones, name='listar_participaciones'),
    path('crear/', crear_participacion, name='crear_participacion'),
    path('obtener/', obtener_participacion, name='obtener_participacion'),  # ?id=1
    path('actualizar/', actualizar_participacion, name='actualizar_participacion'),  # ?id=1
    path('eliminar/', eliminar_participacion, name='eliminar_participacion'),  # ?id=1
]
