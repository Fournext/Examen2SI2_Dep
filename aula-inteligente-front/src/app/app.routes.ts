import { Routes } from '@angular/router';
import { publicRoutes } from './routes/public.routes';
import { privateRoutes } from './routes/private.routes';

export const routes: Routes = [
  ...publicRoutes,
  ...privateRoutes,
];
