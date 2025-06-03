from django.urls import path
from temas.views import crear_tema, actualizar_tema, eliminar_tema, listar_temas, obtener_tema

urlpatterns = [
    path('listar/', listar_temas, name='listar_temas'),
    path('crear/', crear_tema, name='crear_tema'),
    path('actualizar/', actualizar_tema, name='actualizar_tema'),
    path('obtener/', obtener_tema, name='obtener_tema'),
    path('<int:pk>/eliminar/', eliminar_tema, name='eliminar_tema')
]
