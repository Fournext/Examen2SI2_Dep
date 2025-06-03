from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from materias.models import Materia
from materias.serializers import MateriaSerializer


@api_view(['GET'])
def listar_materias(request):
    materias = Materia.objects.all()  # pylint: disable=no-member
    serializer = MateriaSerializer(materias, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_materia(request):
    serializer = MateriaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Registro realizado exitosamente'
        }, status=status.HTTP_201_CREATED)

    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo registrar la materia'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_materia(request):
    id_materia = request.query_params.get('id')
    try:
        materia = Materia.objects.get(  # pylint: disable=no-member
            id=id_materia)
    except Materia.DoesNotExist:                       # pylint: disable=no-member
        return Response({
            'success': True,
            'error': 'Materia no encontrada',
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = MateriaSerializer(materia)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Materia encontrada'
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def actualizar_materia(request):
    id_materia = request.query_params.get('id')
    try:
        materia = Materia.objects.get(   # pylint: disable=no-member
            id=id_materia)
    except Materia.DoesNotExist:   # pylint: disable=no-member
        return Response({
            'success': False,
            'error': 'Materia no encontrada'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = MateriaSerializer(materia, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Actualizado correctamente'
        }, status=status.HTTP_200_OK)
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_materia(request, pk):
    try:
        materia = Materia.objects.get(pk=pk)  # pylint: disable=no-member
    except Materia.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    materia.delete()
    return Response({'mensaje': 'Materia eliminada'}, status=status.HTTP_204_NO_CONTENT)
