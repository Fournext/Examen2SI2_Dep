from django.urls import path
from aulas.views import (
    listar_aulas,
    crear_aula,
    obtener_aula,
    actualizar_aula
)

urlpatterns = [
    path('listar/', listar_aulas, name='listar_aulas'),
    path('crear/', crear_aula, name='crear_aula'),
    path('obtener/', obtener_aula, name='obtener_aula'),
    path('actualizar/', actualizar_aula, name='actualizar-aula')
]
