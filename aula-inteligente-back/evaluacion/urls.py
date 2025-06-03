from django.urls import path
from .views import listar_evaluaciones, crear_evaluacion, obtener_evaluacion, actualizar_evaluacion, eliminar_evaluacion

urlpatterns = [
    path('listar/', listar_evaluaciones, name='listar_evaluaciones'),
    path('crear/', crear_evaluacion, name='crear_evaluacion'),
    path('obtener/', obtener_evaluacion, name='obtener_evaluacion'),  # ?id=1
    path('actualizar/', actualizar_evaluacion, name='actualizar_evaluacion'),  # ?id=1
    path('eliminar/', eliminar_evaluacion, name='eliminar_evaluacion'),  # ?id=1
]
