import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Firebase } from '../../services/firebase';
import { FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  public helperMessage = linkedSignal(() => this.errorMessage());
  
  private readonly firebaseApp = inject(Firebase);
  private readonly router = inject(Router);

  private errorMessage = signal<string>('');

  public async login(): Promise<void> {
    this.handleFormInput();

    const { email, password } = this.form.value;

    if (email && password) {
      try {
        await this.firebaseApp.loginWithEmailPassword(email, password);
        this.helperMessage.set('Login successful!');
        
        this.router.navigate(['']);
      } catch (error) {
        this.handleError(error as FirebaseError);
      }
    }
  }

  public async signUp(): Promise<void> {
    this.handleFormInput();

    const { email, password } = this.form.value;

    if (email && password) {
      try {
        await this.firebaseApp.signUpWithEmailPassword(email, password);
        this.helperMessage.set('Sign up successful! You can now log in.');
      } catch (error) {
        this.handleError(error as FirebaseError);
      }
    }
  }

  private handleFormInput(): void {
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Please fill in all required fields with valid information.');

      return;
    }
  }

  private handleError(error: FirebaseError): void {
    const { cause, code, customData, message } = error;
    console.log({
      cause,
      code,
      customData,
      message,
    });

    if (message) {
      const cleaned = message
        .replace(/^Firebase:\s*/i, '')
        .replace(/\(auth\//g, '')
        .replace(/\)/g, '')
        .trim();

      this.errorMessage.set(cleaned || 'An unknown error occurred.');
    } else {
      this.errorMessage.set('An unknown error occurred.');
    }
  }
}
