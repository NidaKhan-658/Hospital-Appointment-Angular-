import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../Enviornments/enviornment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Appointment {
  id?: number;
  patientName: string;
  date: string;
  time: string;
  department: string;
  symptoms?: string;
  doctorName?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  // Use the API URL from the environment file
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Implement HTTP GET request
  getAppointments(): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.apiUrl}/appointments`)
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP POST request
  // Add a new appointment
  addAppointment(appointment: Appointment): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/appointments`, appointment)
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP PUT request
  updateAppointment(updatedAppointment: Appointment): Observable<Appointment> {
    return this.http
      .put<Appointment>(
        `${this.apiUrl}/appointments/${updatedAppointment.id}`,
        updatedAppointment
      )
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP DELETE request
  deleteAppointment(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/appointments/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP PUT request for status update
  updateStatus(appointment: Appointment): Observable<Appointment> {
    return this.http
      .put<Appointment>(
        `${this.apiUrl}/appointments/${appointment.id}`,
        appointment
      )
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP GET request for search
  searchAppointments(searchTerm: string): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.apiUrl}/appointments?q=${searchTerm}`)
      .pipe(catchError(this.handleError));
  }

  // Implement HTTP GET request for filter
  filterAppointments(status: string): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.apiUrl}/appointments?status=${status}`)
      .pipe(catchError(this.handleError));
  }

  // Get an appointment by ID
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  // Get appointment statistics
  getAppointmentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments/statistics`);
  }

  //edit
  editAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/appointments/${appointment.id}`, appointment);
  }

  //view
  viewAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/appointments/${id}`);
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => error.message || 'Server error');
  }
}
