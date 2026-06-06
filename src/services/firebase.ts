import { Service } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  Persistence,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { addDoc, collection, deleteDoc, DocumentReference, DocumentSnapshot, getDoc, getDocs, getFirestore, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';

import { environment } from '../environments/environment';

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

  public async setPersistence(persistence: Persistence): Promise<void> {
    await this.auth.setPersistence(persistence);
  }

  public async loginWithEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async signUpWithEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async getAllDocuments(): Promise<QuerySnapshot> {
    return await getDocs(collection(this.db, "users"));
  }

  public async getSingleDocument(doc: DocumentReference): Promise<DocumentSnapshot> {
    return await getDoc(doc);
  }

  public async createDocument(): Promise<DocumentReference> {
    return await addDoc(collection(this.db, "users"), {
      random: Math.random()
    });
  }

  public async updateDocument(doc: DocumentReference): Promise<void> {
    return await updateDoc(doc, { random: Math.random() });
  }

  public async deleteDocument(doc: DocumentReference): Promise<void> {
    await deleteDoc(doc);
  }
}
