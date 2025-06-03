from django.urls import path
from .views import listar_tareas, crear_tarea, obtener_tarea, actualizar_tarea, eliminar_tarea

urlpatterns = [
    path('listar/', listar_tareas, name='listar_tareas'),
    path('crear/', crear_tarea, name='crear_tarea'),
    path('obtener/', obtener_tarea, name='obtener_tarea'),  # ?id=1
    path('actualizar/', actualizar_tarea, name='actualizar_tarea'),  # ?id=1
    path('eliminar/', eliminar_tarea, name='eliminar_tarea'),  # ?id=1
]
