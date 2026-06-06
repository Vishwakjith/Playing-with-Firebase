import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';

import { Firebase } from '../services/firebase';

export const authGuard: CanMatchFn = (): MaybeAsync<GuardResult> => {
  const firebase = inject(Firebase);
  const router = inject(Router);

  return firebase.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
