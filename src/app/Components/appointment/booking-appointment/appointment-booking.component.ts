import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Appointment, AppointmentService } from '../../../Services/appointment.service';
import { StatusPipe } from '../../shared/pipes/status.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css'],
  providers: [DatePipe, StatusPipe]
})
export class AppointmentBookingComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  appointmentForm: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      time: ['', Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      symptoms: [''],
      file: [null],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  addAppointment(): void {
    console.log(this.appointmentForm.value);
    if (this.appointmentForm.invalid) {
      return;
    }

    const newAppointment: Appointment = {
      ...this.appointmentForm.value,
      id: this.generateUniqueId()
    };
    
    this.appointmentService.addAppointment(newAppointment)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.getAppointments();
          this.appointmentForm.reset();
        },
        error: (error) => {
          console.error('Error adding appointment:', error);
        }
      });
  }

  private generateUniqueId(): string {
    return uuidv4(); // Generate UUID for unique ID
  }
  getAppointments(): void {
    this.appointmentService.getAppointments()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
        },
        error: (error) => {
          console.error('Error fetching appointments:', error);
        }
      });
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
