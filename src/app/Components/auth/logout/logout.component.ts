import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(
      () => {
        // Clear any local storage or session data if necessary
        localStorage.removeItem('user');
        // Redirect to login page or home page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }

  cancel() {
    // Navigate back to the previous page or to a default page
    this.router.navigate(['/']);
  }
}

