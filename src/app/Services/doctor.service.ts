import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Enviornments/enviornment';


export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  experience: number;
  availability: string;
  contact: string;
  email: string;
}


@Injectable({
  providedIn: 'root',
})


export class DoctorService {
  private apiUrl = environment.apiUrl;  // Replace with actual file upload API

  constructor(private http: HttpClient) {}


 // Get doctor by ID
 getDoctorById(id: number): Observable<Doctor> {
  return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
}

// Create a new doctor
createDoctor(doctor: Doctor): Observable<Doctor> {
  return this.http.post<Doctor>(`${this.apiUrl}/doctor`, doctor);
}

// Update existing doctor
updateDoctor(doctor: Doctor): Observable<any> {
  return this.http.put(`${this.apiUrl}/doctor/${doctor.id}`, doctor);
}


// Delete a doctor
deleteDoctor(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/doctor/${id}`);
}


  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }


}
