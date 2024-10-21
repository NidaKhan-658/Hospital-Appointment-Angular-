import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Handle successful login (e.g., store token, redirect)
          console.log('Login successful', response);
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(response));

          // Navigate based on user role
          const userRole = response.userrole;
          switch (userRole) {
            case 'patient':
              this.router.navigate(['/patient/dashboard']);
              break;
            case 'admin':
              this.router.navigate(['/admin/dashboard']);
              break;
            case 'doctor':
              this.router.navigate(['/doctor/dashboard']);
              break;
            default:
              this.router.navigate(['/dashboard']);
              break;
          }
        },
        error: () => {
          this.error = 'Invalid email or password';
          console.error('Login failed');
        }
      });
    }
  }
}

