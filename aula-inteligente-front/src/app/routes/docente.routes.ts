import { Routes } from '@angular/router';
import { LayoutDocenteComponent } from '../Docentes/layout-docente/layout-docente.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';

export const privateDocenteRoutes: Routes = [
  {
    path: 'private-docente',
    component: LayoutDocenteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['docente'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../Docentes/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
      }, {
        path: 'estudiante',
        loadComponent: () => import('../Docentes/pages/estudiante-page/estudiante-page.component').then(m => m.EstudiantePageComponent)
      },
      {
        path: 'aula',
        loadComponent: () => import('../Docentes/pages/aula-page/aula-page.component').then(m => m.AulaPageComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
]
