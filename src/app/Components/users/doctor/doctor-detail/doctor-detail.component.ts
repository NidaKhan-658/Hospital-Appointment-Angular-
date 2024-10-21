import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService, Doctor } from '../../../../Services/doctor.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css'],
})
export class DoctorDetailComponent implements OnInit {
  doctorForm: FormGroup |any;
  doctor: Doctor | undefined;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1)]],
      availability: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDoctor(+id);
    }
  }

  // create doctor
  createDoctor(): void {
    this.doctorService.createDoctor(this.doctorForm.value).subscribe({
      next: () => {
        this.successMessage = 'Doctor created successfully';
        alert(this.successMessage);
        
      },
    });
  }

  getDoctor(id: number): void {
    this.isLoading = true;
    this.doctorService.getDoctorById(id).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.doctorForm.patchValue(doctor); // Fill form with existing doctor data
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error fetching doctor details';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) return;

    const doctorData = this.doctorForm.value;

    if (this.doctor) {
      // Update existing doctor
      const updatedDoctor = { ...this.doctor, ...doctorData };
      this.doctorService.updateDoctor(updatedDoctor).subscribe({
        next: () => {
          this.successMessage = 'Doctor details updated successfully';
          this.router.navigate(['/doctors']);
        },
        error: () => {
          this.errorMessage = 'Error updating doctor details';
        },
      });
    } else {
      // Create new doctor
      const newDoctor = { id: this.generateRandomId(), ...doctorData };
      this.doctorService.createDoctor(newDoctor).subscribe({
        next: () => {
          this.successMessage = 'Doctor created successfully';
          this.router.navigate(['/doctors']);
        },
        error: () => {
          this.errorMessage = 'Error creating doctor details';
        },
      });
    }
  }

  onDelete(): void {
    if (!this.doctor || !this.doctor.id) return;

    this.doctorService.deleteDoctor(this.doctor.id).subscribe({
      next: () => this.router.navigate(['/doctors']),
      error: () => {
        this.errorMessage = 'Error deleting doctor details';
      },
    });
  }

  onReset(): void {
    this.doctorForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  private generateRandomId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
