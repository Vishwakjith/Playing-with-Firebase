import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Firebase } from '../services/firebase';
import { browserSessionPersistence } from 'firebase/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(Firebase).setPersistence(browserSessionPersistence)),
    provideRouter(routes),
  ],
};
