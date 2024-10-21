import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment, AppointmentService } from '../../../../Services/appointment.service';
import { DoctorService } from '../../../../Services/doctor.service';

@Component({
  selector: 'app-appointment-review',
  templateUrl: './appointment-review.component.html',
  styleUrls: ['./appointment-review.component.css'],
})
export class AppointmentReviewComponent implements OnInit {
  appointment: Appointment | undefined;
  isLoading: boolean = true;
  errorMessage: string = '';
  fileError: string = '';
  selectedFile: File | null = null;
  reviewForm: FormGroup |any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {
    this.reviewForm = this.fb.group({
      diagnosis: ['', Validators.required],
      notes: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getAppointment(+id);
    }
  }

  getAppointment(id: number): void {
    this.isLoading = true;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment: Appointment | undefined) => {
        this.appointment = appointment;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching appointment';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.size <= 5000000) {  // 5MB limit
      this.selectedFile = file;
      this.fileError = '';
    } else {
      this.fileError = 'File size should be less than 5MB';
    }
  }

  onSubmit(): void {
    if (!this.appointment || this.reviewForm.invalid) return;

    const reviewData = this.reviewForm.value;
    const updatedAppointment = { ...this.appointment, ...reviewData, status: 'Reviewed' };

    if (this.selectedFile) {
      // Upload file first
      this.doctorService.uploadFile(this.selectedFile).subscribe({
        next: (fileUrl: any) => {
          updatedAppointment['reportUrl'] = fileUrl; // Add report URL to the appointment data
          this.submitAppointmentReview(updatedAppointment);
        },
        error: (error: any) => {
          this.errorMessage = 'Error uploading file';
          console.error(error);
        }
      });
    } else {
      // Submit without file
      this.submitAppointmentReview(updatedAppointment);
    }
  }

  submitAppointmentReview(updatedAppointment: Appointment): void {
    this.appointmentService.updateAppointment(updatedAppointment).subscribe({
      next: () => {
        console.log('Appointment review submitted successfully');
        this.router.navigate(['/appointments']);
      },
      error: (error) => {
        this.errorMessage = 'Error submitting appointment review';
        console.error(error);
      }
    });
  }
}
