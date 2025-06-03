from django.urls import path
from gestiones.views import actualizar_gestion, crear_gestion, eliminar_gestion, listar_gestiones, obtener_gestion

urlpatterns = [
    path('listar/', listar_gestiones, name='listar_gestiones'),
    path('crear/', crear_gestion, name='crear_gestion'),
    path('actualizar/', actualizar_gestion, name='actualizar_gestion'),
    path('obtener/', obtener_gestion, name='obtener_gestion')
]
