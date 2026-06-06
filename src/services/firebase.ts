import { Service } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

import { environment } from '../environments/environment';
import { getFirestore } from 'firebase/firestore';

@Service()
export class Firebase {
  private db;
  private auth;

  public constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  public async loginWithEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async signUpWithEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }
}
