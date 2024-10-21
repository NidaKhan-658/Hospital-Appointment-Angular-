import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../Services/patient.service'; 
import { Patient } from '../../../../Services/patient.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
})
export class PatientDashboardComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  paginatedPatients: Patient[] = [];
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Oncology'];
  selectedDepartment: string = '';
  searchTerm: string = '';
  totalPatients: number = 0;
  currentPage: number = 1;
  pageSize: number = 5; 
  totalPages: number = 0;
  paginationRange: number[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.getPatients();
  }

  // Get patients from service
  getPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (data: Patient[]) => {
        this.patients = data;
        this.filteredPatients = this.patients;
        this.totalPatients = this.patients.length;
        this.updatePagination();
      },
      (error: any) => console.error('Error fetching patients:', error)
    );
  }

  // Search patients by name or ID
  onSearch(): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (patient.id !== undefined && patient.id.toString().includes(this.searchTerm))
    );
    this.updatePagination();
  }

  // Filter patients by department
  filterByDepartment(): void {
    if (this.selectedDepartment) {
      this.filteredPatients = this.patients.filter(
        patient => patient.department === this.selectedDepartment
      );
    } else {
      this.filteredPatients = this.patients;
    }
    this.updatePagination();
  }

  // Pagination controls
  updatePagination(): void {
    this.totalPatients = this.filteredPatients.length;
    this.totalPages = Math.ceil(this.totalPatients / this.pageSize);
    this.currentPage = 1;
    this.paginate();
    this.paginationRange = Array.from({ length: this.totalPages }, (v, k) => k + 1);
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPatients = this.filteredPatients.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  // CRUD Operations
  addNewPatient(): void {
    this.router.navigate(['/patient-profile']);
    // Logic to open form for adding a new patient
  }

  editPatient(patientId: number): void {
    this.router.navigate(['/patient/detail', patientId]);
    // Logic to open edit form for selected patient
  }

  deletePatient(patientId: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(patientId).subscribe(
        () => {
          alert('Patient deleted successfully!');
          this.getPatients();
        },
        (error: any) => {
          console.error('Error deleting patient:', error);
        }
      );
    }
  }
}

