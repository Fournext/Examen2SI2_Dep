from django.urls import path
from .views import listar_auto_evaluaciones, crear_auto_evaluacion, obtener_auto_evaluacion, actualizar_auto_evaluacion, eliminar_auto_evaluacion

urlpatterns = [
    path('listar/', listar_auto_evaluaciones, name='listar_auto_evaluaciones'),
    path('crear/', crear_auto_evaluacion, name='crear_auto_evaluacion'),
    path('obtener/', obtener_auto_evaluacion, name='obtener_auto_evaluacion'),  # ?id=1
    path('actualizar/', actualizar_auto_evaluacion, name='actualizar_auto_evaluacion'),  # ?id=1
    path('eliminar/', eliminar_auto_evaluacion, name='eliminar_auto_evaluacion'),  # ?id=1
]
