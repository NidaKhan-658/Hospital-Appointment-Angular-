import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Enviornments/enviornment';
interface DashboardStatistics {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  pendingAppointments: number;
  totalUsers: number;
  doctors: number;
  patients: number;
}

interface RecentActivity {
  id: number;
  type: string;
  description: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationDto {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserUpdateDto {
  name?: string;
  email?: string;
  role?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }

  searchUsers(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/search?term=${term}`);
  }

  filterUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/filter?role=${role}`);
  }
}
