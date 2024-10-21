import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '../../../../Services/doctor.service';
import { Router } from '@angular/router';
import { Patient,PatientService } from '../../../../Services/patient.service';
import { Appointment,AppointmentService } from '../../../../Services/appointment.service';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  searchTerm: string = '';
  selectedAppointmentStatus: string = '';
  selectedDate: string = '';
  activeTab: 'patients' | 'appointments' = 'patients';
  
  patients: Patient[] = [];
  appointments: Appointment[] = [];
  
  paginatedPatients: Patient[] = [];
  paginatedAppointments: Appointment[] = [];
  
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  
  appointmentStatuses: string[] = ['Scheduled', 'Completed', 'Cancelled'];

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadAppointments();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      this.updatePagination();
    });
  }

  loadAppointments(): void {
   this.appointmentService.getAppointments().subscribe((data: Appointment[]) => {
    this.appointments = data;
      this.updatePagination();
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  filterByStatus(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  filterByDate(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  setActiveTab(tab: 'patients' | 'appointments'): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.updatePagination();
  }

  viewPatientDetails(patientId: number): void {
    // TODO: Implement navigation to patient details page
    this.router.navigate(['/patient/detail/', patientId]);
    console.log('View patient details:', patientId);
  }

  editPatient(patientId: number): void {
    this.router.navigate(['/patient/detail/:id']);
    console.log('Edit patient:', patientId);
  }

  viewAppointmentDetails(id: number): void {
    this.router.navigate(['/appointment/detail/', id]);
    console.log('View appointment details:', id);
  }

  editAppointment(id: number): void {
    this.router.navigate(['/doctor/review/', id]);
    console.log('Edit appointment:', id);
  }

  updatePagination(): void {
    const filteredData = this.activeTab === 'patients' ? this.filterPatients() : this.filterAppointments();
    this.totalPages = Math.ceil(filteredData.length / this.pageSize);
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    if (this.activeTab === 'patients') {
      this.paginatedPatients = filteredData.slice(startIndex, endIndex) as Patient[];
    } else {
      this.paginatedAppointments = filteredData.slice(startIndex, endIndex) as Appointment[];
    }
  }

  filterPatients(): Patient[] {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.patients.filter(patient => 
      patient.patientName.toLowerCase().includes(searchTermLower) ||
      patient.id?.toString().includes(this.searchTerm) ||
      patient.contact?.includes(this.searchTerm) ||
      patient.department?.toLowerCase().includes(searchTermLower)
    );
  }

  filterAppointments(): Appointment[] {
    const searchTermLower = this.searchTerm.toLowerCase();
    const selectedDate = this.selectedDate ? new Date(this.selectedDate) : null;
    
    return this.appointments.filter(appointment => {
      const nameMatch = appointment.patientName?.toLowerCase().includes(searchTermLower);
      const idMatch = appointment.id?.toString().includes(this.searchTerm);
      const statusMatch = this.selectedAppointmentStatus === '' || appointment.status === this.selectedAppointmentStatus;
      const dateMatch = !selectedDate || (appointment.date && new Date(appointment.date).toDateString() === selectedDate.toDateString());
      
      return (nameMatch || idMatch) && statusMatch && dateMatch;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  get paginationRange(): number[] {
    const range = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }
}
