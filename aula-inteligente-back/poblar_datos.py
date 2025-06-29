import random
from boletin_materia.models import BoletinMateria
from estudiantes.models import Estudiante
from gestiones.models import Gestion
from trimestre.models import Trimestre
from usuarios.models import Usuario
from aulas.models import Aula
from niveles.models import Nivel
from materias.models import Materia

# Crear Usuarios
usuario_alumno = Usuario(
    username="Fournext", email="sebastianzc04@gmail.com", tipo_usuario="estudiante", estado="activo"
)
usuario_alumno.set_password("123456")
usuario_alumno.save()

usuario_admin = Usuario(
    username="admin", email="admin@example.com", tipo_usuario="administrativo", estado="activo"
)
usuario_admin.set_password("123456")
usuario_admin.save()

usuario_docente = Usuario(
    username="Quispe", email="quispe@example.com", tipo_usuario="docente", estado="activo"
)
usuario_docente.set_password("123456")
usuario_docente.save()

# Crear Aulas
aula1 = Aula.objects.create(codigo="A-101", capacidad=30, estado="activo")
aula2 = Aula.objects.create(codigo="A-102", capacidad=25, estado="activo")
aula3 = Aula.objects.create(codigo="A-103", capacidad=20, estado="activo")

# Crear gestiones desde 2023 hasta 2025
gestion1 = Gestion.objects.create(
    nombre="Gestion 2023", fecha_inicio="2023-01-01", fecha_culminacion="2023-12-31"
)
gestion2 = Gestion.objects.create(
    nombre="Gestion 2024", fecha_inicio="2024-01-01", fecha_culminacion="2024-12-31"
)
gestion3 = Gestion.objects.create(
    nombre="Gestion 2025", fecha_inicio="2025-01-01", fecha_culminacion="2025-12-31"
)

# Crear trimestres para cada gestión
Trimestre.objects.bulk_create([
    # 2023
    Trimestre(nombre="Primer Trimestre 2023", fecha_inicio="2023-01-01", fecha_culminacion="2023-03-31", gestion=gestion1),
    Trimestre(nombre="Segundo Trimestre 2023", fecha_inicio="2023-04-01", fecha_culminacion="2023-06-30", gestion=gestion1),
    Trimestre(nombre="Tercer Trimestre 2023", fecha_inicio="2023-07-01", fecha_culminacion="2023-09-30", gestion=gestion1),
    Trimestre(nombre="Cuarto Trimestre 2023", fecha_inicio="2023-10-01", fecha_culminacion="2023-12-31", gestion=gestion1),
    # 2024
    Trimestre(nombre="Primer Trimestre 2024", fecha_inicio="2024-01-01", fecha_culminacion="2024-03-31", gestion=gestion2),
    Trimestre(nombre="Segundo Trimestre 2024", fecha_inicio="2024-04-01", fecha_culminacion="2024-06-30", gestion=gestion2),
    Trimestre(nombre="Tercer Trimestre 2024", fecha_inicio="2024-07-01", fecha_culminacion="2024-09-30", gestion=gestion2),
    Trimestre(nombre="Cuarto Trimestre 2024", fecha_inicio="2024-10-01", fecha_culminacion="2024-12-31", gestion=gestion2),
    # 2025
    Trimestre(nombre="Primer Trimestre 2025", fecha_inicio="2025-01-01", fecha_culminacion="2025-03-31", gestion=gestion3),
    Trimestre(nombre="Segundo Trimestre 2025", fecha_inicio="2025-04-01", fecha_culminacion="2025-06-30", gestion=gestion3),
    Trimestre(nombre="Tercer Trimestre 2025", fecha_inicio="2025-07-01", fecha_culminacion="2025-09-30", gestion=gestion3),
    Trimestre(nombre="Cuarto Trimestre 2025", fecha_inicio="2025-10-01", fecha_culminacion="2025-12-31", gestion=gestion3),
])

# Crear Niveles
nivel1 = Nivel.objects.create(codigo="NIV-2023-1", descripcion="Primaria", aula=aula1)
nivel2 = Nivel.objects.create(codigo="NIV-2023-2", descripcion="Secundaria", aula=aula2)
nivel3 = Nivel.objects.create(codigo="NIV-2023-3", descripcion="Preparatoria", aula=aula3)

# Crear Materias
Materia.objects.bulk_create([
    # Nivel 1: Primaria
    Materia(codigo="MAT-001", nombre="Matematicas", carga_horaria=5.0, estado="activo", nivel=nivel1),
    Materia(codigo="MAT-002", nombre="Lenguaje", carga_horaria=4.0, estado="activo", nivel=nivel1),
    Materia(codigo="MAT-007", nombre="Educacion Fisica", carga_horaria=2.0, estado="activo", nivel=nivel1),
    Materia(codigo="MAT-008", nombre="Arte", carga_horaria=2.0, estado="activo", nivel=nivel1),
    Materia(codigo="MAT-009", nombre="Computacion", carga_horaria=3.0, estado="activo", nivel=nivel1),

    # Nivel 2: Secundaria
    Materia(codigo="MAT-003", nombre="Ciencias Naturales", carga_horaria=3.0, estado="activo", nivel=nivel2),
    Materia(codigo="MAT-004", nombre="Historia", carga_horaria=2.0, estado="activo", nivel=nivel2),
    Materia(codigo="MAT-010", nombre="Geografia", carga_horaria=2.0, estado="activo", nivel=nivel2),
    Materia(codigo="MAT-011", nombre="Educacion Civica", carga_horaria=1.5, estado="activo", nivel=nivel2),
    Materia(codigo="MAT-012", nombre="Ingles", carga_horaria=3.0, estado="activo", nivel=nivel2),

    # Nivel 3: Preparatoria
    Materia(codigo="MAT-005", nombre="Fisica", carga_horaria=4.0, estado="activo", nivel=nivel3),
    Materia(codigo="MAT-006", nombre="Quimica", carga_horaria=3.5, estado="activo", nivel=nivel3),
    Materia(codigo="MAT-013", nombre="Biologia", carga_horaria=3.0, estado="activo", nivel=nivel3),
    Materia(codigo="MAT-014", nombre="Filosofia", carga_horaria=2.0, estado="activo", nivel=nivel3),
    Materia(codigo="MAT-015", nombre="Logica Matematica", carga_horaria=2.5, estado="activo", nivel=nivel3),
])

# Crear estudiante
estudiante = Estudiante.objects.create(
    nombre="Sebastian", apellido="Zeballos", carnet_estudiante="CE1000",
    fecha_nacimiento="2010-01-01", direccion="Direccion Central",
    rude="RUDE1000", estado="activo", telefono_apoderado="77777777",
    nombre_apoderado="Padre", apellido_apoderado="Zeballos", carnet_apoderado="CA1000",
    gestion=gestion1, nivel=nivel1, usuario=usuario_alumno
)

# Obtener trimestres desde la base
todos_trimestres = Trimestre.objects.exclude(nombre="Cuarto Trimestre 2025")

# Obtener materias ya insertadas
materias_guardadas = Materia.objects.filter(nivel=nivel1)

# Crear boletines
for trimestre in todos_trimestres:
    for materia in materias_guardadas:
        BoletinMateria.objects.create(
            ser=random.uniform(0, 10),
            saber=random.uniform(0, 35),
            hacer=random.uniform(0, 35),
            decidir=random.uniform(0, 10),
            trimestre=trimestre,
            estudiante=estudiante,
            materia=materia
        )


print("✅ Datos cargados: usuarios (alumno, admin, docente), aulas, gestiones (2023-2025), trimestres, niveles y materias.")
