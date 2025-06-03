from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BoletinMateria
from .serializers import BoletinMateriaSerializer

@api_view(['GET'])
def listar_boletin_materias(request):
    boletines = BoletinMateria.objects.all()
    serializer = BoletinMateriaSerializer(boletines, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_boletin_materia(request):
    serializer = BoletinMateriaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Boletín de materia creado exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_boletin_materia(request):
    id_boletin = request.query_params.get('id')
    try:
        boletin = BoletinMateria.objects.get(pk=id_boletin)
    except BoletinMateria.DoesNotExist:
        return Response({'success': False, 'error': 'Boletín de materia no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializer = BoletinMateriaSerializer(boletin)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_boletin_materia(request):
    id_boletin = request.query_params.get('id')
    try:
        boletin = BoletinMateria.objects.get(pk=id_boletin)
    except BoletinMateria.DoesNotExist:
        return Response({'success': False, 'error': 'Boletín de materia no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializer = BoletinMateriaSerializer(boletin, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data, 'message': 'Boletín de materia actualizado exitosamente'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_boletin_materia(request):
    id_boletin = request.query_params.get('id')
    if not id_boletin:
        return Response({'success': False, 'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        boletin = BoletinMateria.objects.get(pk=id_boletin)
        boletin.delete()
        return Response({'success': True, 'message': 'Boletín de materia eliminado'}, status=status.HTTP_204_NO_CONTENT)
    except BoletinMateria.DoesNotExist:
        return Response({'success': False, 'error': 'Boletín de materia no encontrado'}, status=status.HTTP_404_NOT_FOUND)
