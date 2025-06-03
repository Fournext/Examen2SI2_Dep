from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from docentes.models import Docente
from docentes.serializers import DocenteSerializer


@api_view(['GET'])
def listar_docentes(request):
    # vamos a obtener la lista de docentes
    docentes = Docente.objects.all()  # pylint: disable=no-member
    serializer = DocenteSerializer(docentes, many=True)
    # vamos a devolver el serializer
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def obtener_docente(request):
    id_docente = request.query_params.get('id')
    try:
        docente = Docente.objects.get(  # pylint: disable=no-member
            id=id_docente)   # pylint: disable=no-member
    except Docente.DoesNotExist:   # pylint: disable=no-member
        return Response({'error': 'Docente no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = DocenteSerializer(docente)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Docente encontrado'
    }, status=status.HTTP_200_OK)

# vamos a implementar un endpoint para registrar un docente


@api_view(['POST'])
def crear_docente(request):
    # vamos a serializar la data
    serializer = DocenteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Docente registado exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo registrar al docente'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def actualizar_docente(request):
    id_docente = request.query_params.get('id')
    try:
        docente = Docente.objects.get(  # pylint: disable=no-member
            id=id_docente)  # pylint: disable=no-member
    except Docente.DoesNotExist:  # pylint: disable=no-member
        # si no encuentra al docente
        return Response({
            'success': False,
            'error': 'No se encontro al docente'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = DocenteSerializer(docente, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Docente actualizado correctamente'
        }, status=status.HTTP_200_OK)
    return Response({
        'success': False,
        'error': serializer.errors,
        'message': 'No se pudo actualizar la informacion del docente'
    }, status=status.HTTP_400_BAD_REQUEST)
