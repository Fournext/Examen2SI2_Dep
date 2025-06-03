from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Participacion
from .serializers import ParticipacionSerializer

@api_view(['GET'])
def listar_participaciones(request):
    participaciones = Participacion.objects.all()
    serializer = ParticipacionSerializer(participaciones, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_participacion(request):
    serializer = ParticipacionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Participación creada exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_participacion(request):
    id_participacion = request.query_params.get('id')
    try:
        participacion = Participacion.objects.get(pk=id_participacion)
    except Participacion.DoesNotExist:
        return Response({'success': False, 'error': 'Participación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ParticipacionSerializer(participacion)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_participacion(request):
    id_participacion = request.query_params.get('id')
    try:
        participacion = Participacion.objects.get(pk=id_participacion)
    except Participacion.DoesNotExist:
        return Response({'success': False, 'error': 'Participación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ParticipacionSerializer(participacion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Participación actualizada exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_participacion(request):
    id_participacion = request.query_params.get('id')
    if not id_participacion:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        participacion = Participacion.objects.get(pk=id_participacion)
        participacion.delete()
        return Response({'success': True, 'message': 'Participación eliminada'}, status=status.HTTP_204_NO_CONTENT)
    except Participacion.DoesNotExist:
        return Response({'success': False, 'error': 'Participación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
