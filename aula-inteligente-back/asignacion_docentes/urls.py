from django.urls import path
from asignacion_docentes.views import (actualizar_asignacion, crear_asignacion,
                                       listar_asignaciones, obtener_asignacion)
urlpatterns = [
    path('listar/', listar_asignaciones, name='listar_asignaciones'),
    path('crear/', crear_asignacion, name='crear_asignacion'),
    path('actualizar/', actualizar_asignacion, name='actualizar_asignacion'),
    path('obtener/', obtener_asignacion, name='obtener_asignacion')
]
