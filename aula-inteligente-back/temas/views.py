from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from temas.models import Tema
from temas.serializers import TemaSerializer


@api_view(['GET'])
def listar_temas(request):
    temas = Tema.objects.all()  # pylint: disable=no-member
    serializer = TemaSerializer(temas, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def crear_tema(request):
    serializer = TemaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Tema registrado exitosamente'
        }, status=status.HTTP_201_CREATED)
    # en el caso de que no sea valido el serializer
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


# vamos a crear un endpoint para buscar por id

@api_view(['GET'])
def obtener_tema(request):
    id_tema = request.query_params.get('id')
    try:
        tema = Tema.objects.get(id=id_tema)  # pylint: disable=no-member
    except Tema.DoesNotExist:   # pylint: disable=no-member
        return Response({
            'success': False,
            'error': 'Tema no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = TemaSerializer(tema)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Tema encontrado'
    }, status=status.HTTP_200_OK)

# vamos a implementar un endpoint para actualizar el tema


@api_view(['PUT'])
def actualizar_tema(request):
    id_materia = request.query_params.get('id')

    try:
        tema = Tema.objects.get(id=id_materia)  # pylint: disable=no-member
    except Tema.DoesNotExist:  # pylint: disable=no-member
        return Response({
            'success': False,
            'error': 'Tema no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = TemaSerializer(tema, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': ''
        }, status=status.HTTP_200_OK)

    # si entra aqui los datos hubo problemas con los datos obtenidos
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def eliminar_tema(request, pk):
    try:
        tema = Tema.objects.get(pk=pk)  # pylint: disable=no-member
    except Tema.DoesNotExist:   # pylint: disable=no-member
        return Response({'error': 'Tema no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    tema.delete()
    return Response({'mensaje': 'Tema eliminado'}, status=status.HTTP_204_NO_CONTENT)
