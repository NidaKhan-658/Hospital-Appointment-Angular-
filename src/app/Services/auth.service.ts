import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Enviornments/enviornment';

export interface User {
  username: string;
  email: string;
  password: string;
  userrole: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Adjust this URL to match your backend API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Get user statistics
  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/statistics`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // Implement methods for user authentication and management
  isAuthenticated(): boolean {
    // Check if user is authenticated (e.g., by verifying token)
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }

  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/user/role`);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {});
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user`, userData);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { oldPassword, newPassword });
  }
}
