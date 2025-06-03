import { roleGuard } from './../guards/role.guard';
import { Routes } from "@angular/router";
import { LayoutPrivadoComponent } from "../layout-privado/layout-privado.component";
import { authGuard } from "../guards/auth.guard";



export const privateRoutes: Routes = [
  {
    path: 'private',
    component: LayoutPrivadoComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
      }, {
        path: 'administrativo',
        canActivate: [roleGuard],
        data: { roles: ['administrativo'] },
        loadComponent: () => import('../pages/administrativos-page/administrativos-page.component').then(matchMedia => matchMedia.AdministrativosPageComponent)
      }, {
        path: 'profesor',
        loadComponent: () => import('../pages/profesores-page/profesores-page.component').then(m => m.ProfesoresPageComponent)
      }, {
        path: 'aula',
        loadComponent: () => import('../pages/aula-page/aula-page.component').then(m => m.AulaPageComponent)
      }, {
        path: 'materia',
        loadComponent: () => import('../pages/materia-page/materia-page.component').then(m => m.MateriaPageComponent)
      }, {
        path: 'private/**',
        redirectTo: '/private/administrativo'
      },
      {
        path: '',
        redirectTo: 'administrativo',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'administrativo'
      }
    ]
  }
]
