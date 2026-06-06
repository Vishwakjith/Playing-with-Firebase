import { Routes } from '@angular/router';

import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../routes/login/login').then(c => c.Login),
    },
    {
        path: '',
        children: [],
        canMatch: [authGuard],
    },
    {
        path: '**',
        redirectTo: '',
    }
];
