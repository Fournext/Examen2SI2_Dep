from django.urls import path
from niveles.views import listar_niveles, crear_nivel, actualizar_nivel, obtener_nivel, eliminar_nivel

urlpatterns = [
    path('listar/', listar_niveles, name='listar_niveles'),
    path('crear/', crear_nivel, name='crear_nivel'),
    path('obtener/', obtener_nivel, name='obtener_nivel'),
    path('actualizar/', actualizar_nivel, name='actualizar_nivel-aula'),
    path('eliminar/', eliminar_nivel, name='eliminar_nivel')
]
