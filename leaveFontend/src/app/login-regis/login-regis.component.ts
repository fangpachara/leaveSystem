import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-regis',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-regis.component.html',
  styleUrl: './login-regis.component.css'
})
export class LoginRegisComponent {
  mode = signal<'login' | 'register'>('login');

  loginForm: ReturnType<FormBuilder['group']>;
  registerForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    console.log('Login', this.loginForm.value);
  }

  onRegister() {
    console.log('Register', this.registerForm.value);
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log('Registration successful');
      alert('Registration successful');
    } else {
      console.log('Registration form is invalid');
      alert('Please fill out all fields correctly.');
    }
  }
}
