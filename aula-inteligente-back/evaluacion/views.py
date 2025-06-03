from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Evaluacion
from .serializers import EvaluacionSerializer

@api_view(['GET'])
def listar_evaluaciones(request):
    evaluaciones = Evaluacion.objects.all()
    serializer = EvaluacionSerializer(evaluaciones, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_evaluacion(request):
    serializer = EvaluacionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Evaluación creada exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_evaluacion(request):
    id_evaluacion = request.query_params.get('id')
    try:
        evaluacion = Evaluacion.objects.get(pk=id_evaluacion)
    except Evaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = EvaluacionSerializer(evaluacion)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_evaluacion(request):
    id_evaluacion = request.query_params.get('id')
    try:
        evaluacion = Evaluacion.objects.get(pk=id_evaluacion)
    except Evaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = EvaluacionSerializer(evaluacion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Evaluación actualizada exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_evaluacion(request):
    id_evaluacion = request.query_params.get('id')
    if not id_evaluacion:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        evaluacion = Evaluacion.objects.get(pk=id_evaluacion)
        evaluacion.delete()
        return Response({'success': True, 'message': 'Evaluación eliminada'}, status=status.HTTP_204_NO_CONTENT)
    except Evaluacion.DoesNotExist:
        return Response({'success': False, 'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
