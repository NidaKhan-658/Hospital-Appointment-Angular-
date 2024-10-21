import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Check if the user's role matches the required role for the route
    const requiredRole = route.data['role'];
    if (requiredRole && user !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
