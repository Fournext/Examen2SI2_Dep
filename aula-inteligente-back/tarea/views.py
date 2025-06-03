from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Tarea
from .serializers import TareaSerializer

@api_view(['GET'])
def listar_tareas(request):
    tareas = Tarea.objects.all()
    serializer = TareaSerializer(tareas, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_tarea(request):
    serializer = TareaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Tarea creada exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_tarea(request):
    id_tarea = request.query_params.get('id')
    try:
        tarea = Tarea.objects.get(pk=id_tarea)
    except Tarea.DoesNotExist:
        return Response({'success': False, 'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = TareaSerializer(tarea)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_tarea(request):
    id_tarea = request.query_params.get('id')
    try:
        tarea = Tarea.objects.get(pk=id_tarea)
    except Tarea.DoesNotExist:
        return Response({'success': False, 'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = TareaSerializer(tarea, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Tarea actualizada exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_tarea(request):
    id_tarea = request.query_params.get('id')
    if not id_tarea:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        tarea = Tarea.objects.get(pk=id_tarea)
        tarea.delete()
        return Response({'success': True, 'message': 'Tarea eliminada'}, status=status.HTTP_204_NO_CONTENT)
    except Tarea.DoesNotExist:
        return Response({'success': False, 'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)
