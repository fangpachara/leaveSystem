import { Routes } from '@angular/router';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
  {
    path: 'login-regis',
    loadComponent: () =>
      import('./login-regis/login-regis.component')
        .then(m => m.LoginRegisComponent),
  },
  { path: '**', redirectTo: '' },
];
