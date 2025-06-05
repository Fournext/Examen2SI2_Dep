import { ProfesorService } from './../../../services/profesor/profesor.service';
import { AuthService } from './../../../services/usuario/auth.service';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { AsignacionMateriaService } from '../../../services/asignacion-materia/asignacion-materia.service';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../../../interfaces/token.interface';
import { AsignacionMateria, AsignacionMateriaRegister } from '../../../interfaces/asignacion-materia.interface';
import { Docente } from '../../../interfaces/docente.interface';
import { MateriaTarjetaComponent } from "../../components/materia/materia-tarjeta/materia-tarjeta.component";
import { NivelService } from '../../../services/nivel/nivel.service';
import { Nivel } from '../../../interfaces/nivel.interface';
import { Materia } from '../../../interfaces/materia.interface';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { Estudiante } from '../../../interfaces/estudiante.interface';


@Component({
  selector: 'dashboard-page-docente',
  imports: [MateriaTarjetaComponent],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private materiaService = inject(MateriaService);
  private nivelService = inject(NivelService);
  private asignacionMateriaService = inject(AsignacionMateriaService);
  private estudianteService = inject(EstudianteService);
  private authService = inject(AuthService);
  private docenteService = inject(ProfesorService);



  docente = computed(() => {
    const token = this.authService.getToken();
    if (!token) return 0;
    const decoded = jwtDecode<TokenPayload>(token);
    return this.docenteService.listaDocente().find((docente: Docente) => docente.usuario_username == decoded.username);
  });

  listaAsignaciones = computed(() => {
    const docente = this.docente();
    if (!docente) return [];
    return this.asignacionMateriaService.listaAsignacionMateria().filter(
      (asignacion: AsignacionMateria) => asignacion.docente === docente.id
    );
  });

  listaMateria = computed(() => this.materiaService.listaMateria());
  listaNivel = computed(() => this.nivelService.listaNiveles());
  listaEstudiantes = computed(() => this.estudianteService.listaEstudiantes());

  obtenerMateria(id: number) {
    const materia = this.listaMateria().find((materia: Materia) => materia.id == id);
    if (materia) {
      return materia;
    } else {
      return {
        id: 0,
        codigo: '',
        nombre: '',
        carga_horaria: 0,
        estado: '',
        nivel: 0,
        nivel_descripcion: '',
        temas: [],
        asignacion_docente: []
      }
    }
  }
  obtenerNivel(id_materia: number) {
    const materia = this.listaMateria().find((materia: Materia) => materia.id == id_materia);
    const nivel = this.listaNivel().find((nivel: Nivel) => nivel.id == materia?.nivel);
    if (nivel) {
      return nivel;
    } else {
      return {
        id: 0,
        codigo: '',
        descripcion: '',
        aula: 0,
        materias: []
      }
    }
  }

  obtenerEstudiantes(id_materia: number) {
    const materia = this.listaMateria().find((materia: Materia) => materia.id == id_materia);
    const nivel = this.listaNivel().find((nivel: Nivel) => nivel.id == materia?.nivel);
    const estudiantes = this.listaEstudiantes().filter((estudiante: Estudiante) => estudiante.nivel == nivel?.id)
    return estudiantes;
  }


  ngOnInit() {
    this.docenteService.listarDocente();
    this.asignacionMateriaService.listarAsignacionesMateria();
    this.materiaService.listarMateria();
    this.nivelService.listarNiveles();
    this.estudianteService.listarEstudiantes();
  }
}
