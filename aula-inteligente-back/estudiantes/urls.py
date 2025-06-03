from django.urls import path
from estudiantes.views import crear_estudiante, actualizar_estudiante, listar_estudiantes, obtener_estudiante

urlpatterns = [
    path('listar/', listar_estudiantes, name='listar_estudiantes'),
    path('crear/', crear_estudiante, name='crear_estudiante'),
    path('actualizar/', actualizar_estudiante, name='actualizar_estudiante'),
    path('obtener/', obtener_estudiante, name='obtener_estudiante')
]
