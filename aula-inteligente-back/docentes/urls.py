from django.urls import path
from docentes.views import crear_docente, actualizar_docente, listar_docentes, obtener_docente

urlpatterns = [
    path('listar/', listar_docentes, name='listar_docentes'),
    path('crear/', crear_docente, name='crear_docente'),
    path('actualizar/', actualizar_docente, name='actualizar_docente'),
    path('obtener/', obtener_docente, name='obtener_docente')
]
