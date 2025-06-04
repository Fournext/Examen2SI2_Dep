from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from usuarios.serializers import LoginSerializer, RegisterSerializer, UsuarioSerializer
from usuarios.models import Usuario
from usuarios.utils import generate_jwt


@api_view(['POST'])
def login(request):
    """
    Vista de inicio de sesión de usuario que genera un token JWT si las credenciales son válidas.

    Esta vista espera una solicitud POST con los campos 'username' y 'password'.
    Si el usuario existe y la contraseña es correcta, devuelve un token JWT.
    Si las credenciales son inválidas o los datos no están bien formateados,
      se devuelve un error apropiado.

    Args:
        request (Request): Objeto de solicitud HTTP que contiene los datos del usuario.

    Returns:
        Response:
            - 200 OK con el token JWT si el login es exitoso.
            - 400 Bad Request si la contraseña es incorrecta o el formato de los datos es inválido.
            - 404 Not Found si el usuario no existe.
    """
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        try:
            user = Usuario.objects.get(    # pylint: disable=no-member
                username=username)         # pylint: disable=no-member
        except Usuario.DoesNotExist:       # pylint: disable=no-member
            return Response({'error': 'Usuario o password incorrecto'},
                            status=status.HTTP_404_NOT_FOUND)

        if user.check_password(password):
            token = generate_jwt(user)
            return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuario o password incorrecto'},
                            status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    """
    Vista para registrar un nuevo usuario y devolver sus datos completos.
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        if Usuario.objects.filter(username=data['username']).exists():
            return Response({'error': 'El usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)

        nuevo_usuario = Usuario(
            username=data['username'],
            email=data['email'],
            tipo_usuario=data['tipo_usuario'],
            estado=data['estado']
        )
        nuevo_usuario.set_password(data['password'])
        nuevo_usuario.save()

        usuario_serializado = UsuarioSerializer(nuevo_usuario)

        return Response({
            'mensaje': 'Usuario registrado con éxito',
            'usuario': usuario_serializado.data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_usuario_por_id(request):
    """
    Obtiene un usuario a partir del parámetro de consulta `id`.
    Ejemplo: GET /usuario?id=5
    """
    id_usuario = request.query_params.get('id')

    if not id_usuario:
        return Response({'error': 'ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(  # pylint: disable=no-member
            id=id_usuario)  # pylint: disable=no-member
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Usuario.DoesNotExist:  # pylint: disable=no-member
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
