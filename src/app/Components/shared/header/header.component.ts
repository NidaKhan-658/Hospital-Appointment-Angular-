import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}
  isOpen: { [key: string]: boolean } = {};

  ngOnInit() {
    // Check if user is logged in (this could come from an auth service)
    this.isLoggedIn = !!localStorage.getItem('userToken');
  }

  logout() {
    // Handle logout (this could involve an auth service)
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
