from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from estudiantes.models import Estudiante
from estudiantes.serializers import EstudianteSerializer


@api_view(['GET'])
def listar_estudiantes(request):
    estudiantes = Estudiante.objects.all()  # pylint: disable=no-member
    serializer = EstudianteSerializer(estudiantes, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_estudiante(request):
    serializer = EstudianteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Estudiante registrado exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo registrar el cliente'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_estudiante(request):
    id_estudiante = request.query_params.get('id')
    try:
        estudiante = Estudiante.objects.get(  # pylint: disable=no-member
            id=id_estudiante)  # pylint: disable=no-member
    except Estudiante.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EstudianteSerializer(estudiante)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Estudiante encontrado'
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def actualizar_estudiante(request):
    id_estudiante = request.query_params('id')
    try:
        estudiante = Estudiante.objects.get(  # pylint: disable=no-member
            id=id_estudiante)  # pylint: disable=no-member
    except Estudiante.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EstudianteSerializer(estudiante, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Estudiante actualizado exitosamente'
        }, status=status.HTTP_200_OK)
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo actualizar los datos'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_estudiante(request, pk):
    try:
        estudiante = Estudiante.objects.get(pk=pk)  # pylint: disable=no-member
    except Estudiante.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    estudiante.delete()
    return Response({'mensaje': 'Estudiante eliminado'}, status=status.HTTP_204_NO_CONTENT)
