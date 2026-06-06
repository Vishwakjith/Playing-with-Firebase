import { Routes } from '@angular/router';

import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../routes/login/login').then(c => c.Login),
    },
    {
        path: '',
        loadComponent: () => import('../routes/crud/crud').then(c => c.Crud),
        canMatch: [authGuard],
    },
    {
        path: '**',
        redirectTo: '',
    }
];
