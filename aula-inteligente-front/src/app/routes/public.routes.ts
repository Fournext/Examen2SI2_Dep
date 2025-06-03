// src/app/routes/public.routes.ts
import { Routes } from '@angular/router';
import { LayoutPublicComponent } from '../shared/layout-public/layout-public.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../shared/pages/home-page/home-page.component').then(m => m.HomePageComponent)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../shared/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('../shared/pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
