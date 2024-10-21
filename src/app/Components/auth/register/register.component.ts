import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService ,User} from '../../../Services/auth.service'; // Assuming AuthService handles authentication
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup|any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, userrole } = this.registerForm.value;
      this.authService.register({ username, email, password, userrole }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // You might want to store the user data or token here
          // For example: localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/auth/login']); // Redirect to login page after successful registration
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle error (e.g., show error message to user)
          // You might want to add an error property to the component to display the error message
          // this.errorMessage = error.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control.markAsTouched();
      });
    }
  }
}


