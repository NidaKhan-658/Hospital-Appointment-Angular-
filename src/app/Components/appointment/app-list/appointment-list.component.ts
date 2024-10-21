import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '../../../Services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  searchTerm: string = '';
  appointments: Appointment[] = [];
  paginatedAppointments: Appointment[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  patientName: string | undefined;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  // Fetch all appointments
  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (appointments) => {
        this.appointments = appointments;
        this.calculateTotalPages();
        this.paginateAppointments();
      },
      (error) => this.handleError('Error fetching appointments:', error)
    );
  }

  // Calculate the total number of pages
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.appointments.length / this.itemsPerPage);
  }

  // Paginate appointments based on the current page
  paginateAppointments(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAppointments = this.appointments.slice(startIndex, endIndex);
  }

  // Navigate to specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateAppointments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateAppointments();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateAppointments();
    }
  }

  // Navigate to appointment creation form
  addAppointment(): void {
    this.router.navigate(['/appointment']);
  }

  // Edit appointment
  editAppointment(appointment: Appointment): void {
    const updatedAppointment = {
      ...appointment,
      updatedAt: new Date().toISOString(),
    };  
    this.appointmentService.updateAppointment(updatedAppointment).subscribe({
      next: () => {
        this.getAppointments();
        this.router.navigate(['/appointment/detail/', updatedAppointment.id]);
        console.log(this.router.config);
      },
      error: (error) => {
        this.handleError('Error updating appointment:', error);
      },
      complete: () => {
        console.log('Update appointment operation completed');
      }
    });
  }

  // Delete appointment
  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => this.getAppointments(),
      (error) => this.handleError('Error deleting appointment:', error)
    );
  }

  // Update appointment status
  updateStatus(appointment: Appointment, event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    if (selectedStatus && appointment.status !== selectedStatus) {
      appointment.status = selectedStatus;  // Update status only if changed
      this.appointmentService.updateStatus(appointment).subscribe(
        () => this.getAppointments(),
        (error) => this.handleError('Error updating status:', error)
      );
    }
  }


  // filter appointments by status
  filterAppointments(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this.appointmentService.filterAppointments(selectedStatus).subscribe(
      (appointments) => this.appointments = appointments,
      (error) => this.handleError('Error filtering appointments:', error)
    );
  }
  // Search for appointments by patient name or ID
  searchAppointments(): void {
    if (this.searchTerm.trim()) {
      this.appointmentService.searchAppointments(this.searchTerm.trim()).subscribe(
        (appointments) => {
          this.appointments = appointments;
          this.calculateTotalPages();
          this.currentPage = 1; // Reset to the first page after search
          this.paginateAppointments();
        },
        (error) => this.handleError('Error searching appointments:', error)
      );
    } else {
      this.getAppointments();
    }
  }

  // Handle errors consistently
  private handleError(message: string, error: any): void {
    console.error(message, error);
    // Optionally, display a user-friendly message or notification
  }
}
