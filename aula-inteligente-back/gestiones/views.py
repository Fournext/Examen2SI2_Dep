from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from gestiones.models import Gestion
from gestiones.serializers import GestionSerializer


@api_view(['GET'])
def listar_gestiones(request):
    gestiones = Gestion.objects.all()  # pylint: disable=no-member
    serializer = GestionSerializer(gestiones, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_gestion(request):
    serializer = GestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Gerstion creada exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': True,
        'error': serializer.errors,  # pylint: disable=no-member
        'message': 'No se pudo crear la gestion'  # pylint: disable=no-member
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_gestion(request):
    id_gestion = request.query_params('id')
    try:
        gestion = Gestion.objects.get(  # pylint: disable=no-member
            id=id_gestion)  # pylint: disable=no-member
    except Gestion.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Gestión no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = GestionSerializer(gestion)
    return Response({  # pylint: disable=no-member
        'success': True,
        'data': serializer.data,
        'message': 'Gestion encontrada'
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def actualizar_gestion(request):
    id_gestion = request.query_params('id')
    try:
        gestion = Gestion.objects.get(  # pylint: disable=no-member
            id=id_gestion)  # pylint: disable=no-member
    except Gestion.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Gestión no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = GestionSerializer(gestion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Gestion actualizada'
        })
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo actualizar'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_gestion(request, pk):
    try:
        gestion = Gestion.objects.get(pk=pk)  # pylint: disable=no-member
    except Gestion.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Gestión no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    gestion.delete()
    return Response({'mensaje': 'Gestión eliminada'}, status=status.HTTP_204_NO_CONTENT)
