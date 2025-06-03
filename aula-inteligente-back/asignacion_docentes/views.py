from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from asignacion_docentes.models import Asignacion_docente
from asignacion_docentes.serializers import Asignacion_docente_serializer


@api_view(['GET'])
def listar_asignaciones(request):
    asignaciones = Asignacion_docente.objects.all()  # pylint: disable=no-member
    serializer = Asignacion_docente_serializer(asignaciones, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_asignacion(request):
    serializer = Asignacion_docente_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Creado exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo registrar la asignacion'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_asignacion(request):
    id_asignacion_docente = request.query_params.get('id')
    try:
        asignacion = Asignacion_docente.objects.get(  # pylint: disable=no-member
            id=id_asignacion_docente)  # pylint: disable=no-member
    except Asignacion_docente.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Asignación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = Asignacion_docente_serializer(asignacion)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Asignacion encontrada'
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def actualizar_asignacion(request):
    id_asignacion_docente = request.query_params.get('id')

    try:
        asignacion = Asignacion_docente.objects.get(  # pylint: disable=no-member
            id=id_asignacion_docente)  # pylint: disable=no-member
    except Asignacion_docente.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Asignación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = Asignacion_docente_serializer(asignacion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Actualizado correctamente'
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_asignacion(request, pk):
    try:
        asignacion = Asignacion_docente.objects.get(  # pylint: disable=no-member
            pk=pk)  # pylint: disable=no-member
    except Asignacion_docente.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Asignación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    asignacion.delete()
    return Response({'mensaje': 'Asignación eliminada'}, status=status.HTTP_204_NO_CONTENT)
