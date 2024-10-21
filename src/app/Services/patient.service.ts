import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../Enviornments/enviornment'; 

export interface Patient {
  id?: number; // Optional if using auto-generated ID
  patientName: string;
  age: number | null;
  gender: string;
  contact: string;
  address: string;
  department: string;
  country: string;
  pincode: string;
  summary: string;
  fileUpload: File | null; // Assuming file upload is handled as File object
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}`; // Base API URL

  constructor(private http: HttpClient) {}

  // Add patient profile
  addPatientProfile(patients: Patient[]): Observable<Patient[]> {
    return this.http.post<Patient[]>(`${this.apiUrl}/patients`, patients).pipe(
      catchError(this.handleError) // Centralized error handling
    );
  }

  // Fetch a single patient profile by ID
  getPatientProfile(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${patientId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update patient profile
  updatePatientProfile(patient: Patient): Observable<Patient> {
    if (!patient.id) {
      return throwError(() => new Error('Patient ID is required for update'));
    }
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch all patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch a patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new patient
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing patient
  updatePatient(patient: Patient): Observable<void> {
    if (!patient.id) {
      return throwError(() => new Error('Patient ID is required for update'));
    }
    return this.http.put<void>(`${this.apiUrl}/${patient.id}`, patient).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a patient by ID
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Centralized error handling function
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
