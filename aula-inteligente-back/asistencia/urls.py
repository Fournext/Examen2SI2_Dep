from django.urls import path
from .views import listar_asistencias, crear_asistencia, obtener_asistencia, actualizar_asistencia, eliminar_asistencia

urlpatterns = [
    path('listar/', listar_asistencias, name='listar_asistencias'),
    path('crear/', crear_asistencia, name='crear_asistencia'),
    path('obtener/', obtener_asistencia, name='obtener_asistencia'),  # ?id=1
    path('actualizar/', actualizar_asistencia, name='actualizar_asistencia'),  # ?id=1
    path('eliminar/', eliminar_asistencia, name='eliminar_asistencia'),  # ?id=1
]
