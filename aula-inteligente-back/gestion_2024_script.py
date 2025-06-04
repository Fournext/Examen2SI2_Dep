# gestion_2024_script.py
import csv
import random
import os
from estudiantes.models import Estudiante
from boletin_materia.models import BoletinMateria
from gestiones.models import Gestion
from niveles.models import Nivel
from usuarios.models import Usuario
from materias.models import Materia

gestion = Gestion.objects.get(nombre="Gestion 2024")
niveles = Nivel.objects.all()
materias = Materia.objects.all()
trimestres = gestion.trimestres.all()

with open('datos_boletin.csv', mode='a', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)

    for i in range(1000):
        user = Usuario.objects.create(
            username=f"estu2024_{i}",
            email=f"estu2024_{i}@mail.com",
            password="123456",
            tipo_usuario="estudiante",
            estado="activo"
        )
        nivel = random.choice(niveles)
        estudiante = Estudiante.objects.create(
            nombre=f"Nombre{i}",
            apellido=f"Apellido{i}",
            carnet_estudiante=f"CE24{i}",
            fecha_nacimiento="2010-01-01",
            direccion="Dir 2024",
            rude=f"RUDE24{i}",
            estado="activo",
            telefono_apoderado="70000000",
            nombre_apoderado=f"ApodNombre{i}",
            apellido_apoderado=f"ApodApelli{i}",
            carnet_apoderado=f"CA24{i}",
            gestion=gestion,
            nivel=nivel,
            usuario=user
        )
        for trimestre in trimestres:
            for materia in materias.filter(nivel=nivel):
                ser = round(random.uniform(0, 10), 2)
                saber = round(random.uniform(0, 35), 2)
                hacer = round(random.uniform(0, 35), 2)
                decidir = round(random.uniform(0, 20), 2)
                promedio = round(ser + saber + hacer + decidir, 2)
                estado = "aprobado" if promedio >= 51 else "reprobado"

                BoletinMateria.objects.create(
                    ser=ser, saber=saber, hacer=hacer, decidir=decidir,
                    trimestre=trimestre, estudiante=estudiante, materia=materia
                )
                writer.writerow([
                    estudiante.id, nivel.descripcion, materia.nombre, trimestre.nombre,
                    ser, saber, hacer, decidir, promedio, estado
                ])
