import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../../Services/patient.service'; // Adjust the path as necessary
import { Patient } from '../../../../Services/patient.service'; // Adjust the path as necessary

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patient: Patient = {
    id: Math.floor(Math.random() * 10000), // Generate a random ID
    patientName: '',
    age: null,
    gender: '',
    contact: '',
    address: '',
    summary: '',
    country: '',
    pincode: '',
    fileUpload: null,
    department: ''
  };
  patientForm: FormGroup = this.fb.group({
    patientName: [this.patient.patientName, Validators.required],
    age: [this.patient.age, [Validators.required, Validators.min(0)]],
    gender: [this.patient.gender, Validators.required],
    contact: [this.patient.contact, [Validators.required]],
    address: [this.patient.address, Validators.required],
    country: [this.patient.country, Validators.required],
    pincode: [this.patient.pincode, [Validators.required]],
    summary: [this.patient.summary],
    department: [this.patient.department, Validators.required]
  });

  submitted: boolean = false;

  constructor(
    private patientService: PatientService, 
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.addPatientProfile();
  }
// add patient profile
  addPatientProfile(): void {
    if (this.patientForm.valid) {
        return;
      }
      this.patient = { ...this.patientForm.value, id: this.patient.id };
      this.patientService.addPatientProfile([this.patient]).subscribe(
        () => alert('Profile added successfully!'),
        (error: any) => console.error('Error adding patient profile:', error)
      );
  }


  // Fetch patient profile
  getPatientProfile(): void {
    if (this.patient.id !== undefined) {
        this.patientService.getPatientProfile(this.patient.id).subscribe(
            (data: Patient) => {
                this.patient = data;
                this.patientForm.patchValue(data);
            }
        );
    }
  }

  updatePatientProfile(): void {
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    } 
    this.patientService.updatePatientProfile(this.patient).subscribe(
      () => alert('Profile updated successfully!'),
      (error: any) => console.error('Error updating patient profile:', error)
    );  
  }
  fileUpload(event: any): void {
    this.patient.fileUpload = event.target.files[0];
  } 

}
