from django.urls import path
from materias.views import actualizar_materia, crear_materia, eliminar_materia, listar_materias, obtener_materia

urlpatterns = [
    path('listar/', listar_materias, name='listar_materias'),
    path('crear/', crear_materia, name='crear_materia'),
    path('obtener/', obtener_materia, name='obtener_materia'),
    path('actualizar/', actualizar_materia, name='actualizar_materia'),
    path('eliminar/<int:pk>/', eliminar_materia, name='eliminar_nivel')
]
