from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Trimestre
from .serializers import TrimestreSerializer

@api_view(['GET'])
def listar_trimestres(request):
    trimestres = Trimestre.objects.all()
    serializer = TrimestreSerializer(trimestres, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def crear_trimestre(request):
    serializer = TrimestreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Trimestre creado exitosamente'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_trimestre(request):
    print(request.query_params.get('id'))
    id_trimestre = request.query_params.get('id')
    try:
        trimestre = Trimestre.objects.get(id=id_trimestre)
    except Trimestre.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Trimestre no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = TrimestreSerializer(trimestre)
    return Response({
        'success': True,
        'data': serializer.data,
        'message': 'Trimestre encontrado'
    }, status=status.HTTP_200_OK)

@api_view(['PUT'])
def actualizar_trimestre(request):
    id_trimestre = request.query_params.get('id')
    try:
        trimestre = Trimestre.objects.get(id=id_trimestre)
    except Trimestre.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Trimestre no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = TrimestreSerializer(trimestre, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Trimestre actualizado exitosamente'
        }, status=status.HTTP_200_OK)
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_trimestre(request, pk):
    try:
        trimestre = Trimestre.objects.get(pk=pk)
    except Trimestre.DoesNotExist:
        return Response({'success': False, 'error': 'Trimestre no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    trimestre.delete()
    return Response({'success': True, 'message': 'Trimestre eliminado'}, status=status.HTTP_204_NO_CONTENT)
