from django.urls import path
from .views import predecir_estudiante

urlpatterns = [
    path('prediccion-estudiante/<int:estudiante_id>/', predecir_estudiante),
]
