from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import AutoEvaluacion
from .serializers import AutoEvaluacionSerializer

@api_view(['GET'])
def listar_auto_evaluaciones(request):
    auto_evaluaciones = AutoEvaluacion.objects.all()
    serializer = AutoEvaluacionSerializer(auto_evaluaciones, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_auto_evaluacion(request):
    serializer = AutoEvaluacionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Autoevaluación creada exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_auto_evaluacion(request):
    id_auto_evaluacion = request.query_params.get('id')
    try:
        auto_evaluacion = AutoEvaluacion.objects.get(pk=id_auto_evaluacion)
    except AutoEvaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Autoevaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = AutoEvaluacionSerializer(auto_evaluacion)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_auto_evaluacion(request):
    id_auto_evaluacion = request.query_params.get('id')
    try:
        auto_evaluacion = AutoEvaluacion.objects.get(pk=id_auto_evaluacion)
    except AutoEvaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Autoevaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = AutoEvaluacionSerializer(auto_evaluacion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Autoevaluación actualizada exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_auto_evaluacion(request):
    id_auto_evaluacion = request.query_params.get('id')
    if not id_auto_evaluacion:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        auto_evaluacion = AutoEvaluacion.objects.get(pk=id_auto_evaluacion)
        auto_evaluacion.delete()
        return Response({'success': True, 'message': 'Autoevaluación eliminada'}, status=status.HTTP_204_NO_CONTENT)
    except AutoEvaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Autoevaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
