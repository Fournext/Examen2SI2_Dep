from django.urls import path
from .views import listar_boletin_materias, crear_boletin_materia, obtener_boletin_materia, actualizar_boletin_materia, eliminar_boletin_materia

urlpatterns = [
    path('listar/', listar_boletin_materias, name='listar_boletin_materias'),
    path('crear/', crear_boletin_materia, name='crear_boletin_materia'),
    path('obtener/', obtener_boletin_materia, name='obtener_boletin_materia'),  # ?id=1
    path('actualizar/', actualizar_boletin_materia, name='actualizar_boletin_materia'),  # ?id=1
    path('eliminar/', eliminar_boletin_materia, name='eliminar_boletin_materia'),  # ?id=1
]
