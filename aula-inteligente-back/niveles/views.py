from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from niveles.models import Nivel
from niveles.serializers import NivelSerializer


@api_view(['GET'])
def listar_niveles(request):
    """
    Retorna todos los niveles registrados.
    """
    niveles = Nivel.objects.all()  # pylint: disable=no-member
    serializer = NivelSerializer(niveles, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_nivel(request):
    """
    Crea un nuevo nivel con los datos proporcionados.
    """
    serializer = NivelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data,
                         'message': 'Nivel creado exitosamente'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_nivel(request):
    """
    Retorna un nivel específico por su ID.
    """
    id_nivel = request.query_params.get('id')
    try:
        nivel = Nivel.objects.get(id=id_nivel)  # pylint: disable=no-member
        serializer = NivelSerializer(nivel)
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Nivel.DoesNotExist:  # pylint: disable=no-member
        return Response({
            'success': False,
            'message': 'Nivel no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def actualizar_nivel(request):
    """
    Actualiza un nivel exitosamente mediante ID
    """
    id_nivel = request.query_params.get('id')
    try:
        nivel = Nivel.objects.get(id=id_nivel)  # pylint: disable=no-member
    except Nivel.DoesNotExist:   # pylint: disable=no-member
        return Response({
            'success': False,
            'message': 'Nivel no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = NivelSerializer(nivel, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Nivel actualziado correctamente'
        }, status=status.HTTP_200_OK)
    return Response({'success': False, 'errors': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_nivel(request):
    """
    Elimina un nivel por su ID.
    """
    id_nivel = request.query.get('id')
    try:
        nivel = Nivel.objects.get(id=id_nivel)  # pylint: disable=no-member
        nivel.delete()
        return Response({'success': True, 'message': 'Nivel eliminado correctamente'},
                        status=status.HTTP_204_NO_CONTENT)
    except Nivel.DoesNotExist:   # pylint: disable=no-member
        return Response({'success': False, 'message': 'Nivel no encontrado'},
                        status=status.HTTP_404_NOT_FOUND)
