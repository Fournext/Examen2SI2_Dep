from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Asistencia
from .serializers import AsistenciaSerializer

@api_view(['GET'])
def listar_asistencias(request):
    asistencias = Asistencia.objects.all()
    serializer = AsistenciaSerializer(asistencias, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_asistencia(request):
    serializer = AsistenciaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Asistencia creada exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_asistencia(request):
    id_asistencia = request.query_params.get('id')
    try:
        asistencia = Asistencia.objects.get(pk=id_asistencia)
    except Asistencia.DoesNotExist:
        return Response({'success': False, 'error': 'Asistencia no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = AsistenciaSerializer(asistencia)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_asistencia(request):
    id_asistencia = request.query_params.get('id')
    try:
        asistencia = Asistencia.objects.get(pk=id_asistencia)
    except Asistencia.DoesNotExist:
        return Response({'success': False, 'error': 'Asistencia no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = AsistenciaSerializer(asistencia, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Asistencia actualizada exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_asistencia(request):
    id_asistencia = request.query_params.get('id')
    if not id_asistencia:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        asistencia = Asistencia.objects.get(pk=id_asistencia)
        asistencia.delete()
        return Response({'success': True, 'message': 'Asistencia eliminada'}, status=status.HTTP_204_NO_CONTENT)
    except Asistencia.DoesNotExist:
        return Response({'success': False, 'error': 'Asistencia no encontrada'}, status=status.HTTP_404_NOT_FOUND)
