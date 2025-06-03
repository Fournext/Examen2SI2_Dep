from django.urls import path
from trimestre.views import listar_trimestres, crear_trimestre, actualizar_trimestre, obtener_trimestre, eliminar_trimestre

urlpatterns = [
    path('listar/', listar_trimestres, name='listar_trimestres'),
    path('crear/', crear_trimestre, name='crear_trimestre'),
    path('actualizar/', actualizar_trimestre, name='actualizar_trimestre'),  # ?id=1
    path('obtener/', obtener_trimestre, name='obtener_trimestre'),           # ?id=1
    path('eliminar/<int:pk>/', eliminar_trimestre, name='eliminar_trimestre')
]
