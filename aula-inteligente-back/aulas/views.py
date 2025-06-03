from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from aulas.models import Aula
from aulas.serializers import AulaSerializer


@api_view(['GET'])
def listar_aulas(request):
    """
     Lista todas las aulas registradas.
    """
    aulas = Aula.objects.all()  # pylint: disable=no-member
    serializer = AulaSerializer(aulas, many=True)
    return Response({
        'data': serializer.data
    })


@api_view(['POST'])
def crear_aula(request):
    """
   Crea una nueva aula con una respuesta estructurada personalizada.
   """
    serializer = AulaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Aula creada exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors,
        'message': 'Error al crear el aula'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_aula(request):
    """
    Retorna los datos de una aula específica por su ID.
    """
    id_aula = request.query_params.get('id')
    try:
        aula = Aula.objects.get(id=id_aula)   # pylint: disable=no-member
    except Aula.DoesNotExist:   # pylint: disable=no-member
        return Response({'error': 'Aula no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AulaSerializer(aula)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Aula encontrada'
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def actualizar_aula(request):
    """
    Actualiza los datos de una aula existente.
    """
    id_aula = request.query_params.get('id')
    try:
        aula = Aula.objects.get(id=id_aula)   # pylint: disable=no-member
    except Aula.DoesNotExist:                 # pylint: disable=no-member
        return Response({'error': 'Aula no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AulaSerializer(aula, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Aula actualizada con exito'
        }, status=status.HTTP_200_OK)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
