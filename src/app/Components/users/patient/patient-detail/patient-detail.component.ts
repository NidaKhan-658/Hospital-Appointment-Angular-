import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // To get the patient ID from the URL
import { PatientService, Patient } from '../../../../Services/patient.service'; // Adjust the path as needed
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientId!: number;
  patientForm!: FormGroup;
  patient: Patient | undefined;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id')); // Extract the patient ID from the URL
    this.initForm();
    this.getPatientDetails(this.patientId);
  }

  // Initialize the form with controls and validators
  initForm(): void {
    this.patientForm = this.fb.group({
      patientName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      address: ['', Validators.required],
      department: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.pattern('^[0-9]{5,10}$')]],
      summary: [''],
    });
  }

  // Fetch patient details by ID
  getPatientDetails(patientId: number): void {
    this.patientService.getPatientProfile(patientId).subscribe(
      (data: Patient) => {
        this.patient = data;
        this.patientForm.patchValue(data); // Update form fields with fetched patient data
      },
      (error: any) => console.error('Error fetching patient details:', error)
    );
  }

  // Update patient details
  updatePatient(): void {
    if (this.patientForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    // Merge form values into the patient object
    const updatedPatient = { ...this.patient, ...this.patientForm.value };

    this.patientService.updatePatientProfile(updatedPatient).subscribe(
      () => {
        alert('Patient updated successfully!');
      },
      (error: any) => {
        console.error('Error updating patient details:', error);
        alert('Failed to update patient details. Please try again.');
      }
    );
  }
}
