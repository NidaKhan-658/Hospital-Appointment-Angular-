import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
deleteUser(_t36: any) {
throw new Error('Method not implemented.');
}
  users: any[] = [];
  paginatedUsers: any[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  roles: string[] = ['Admin', 'Doctor', 'Patient'];

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // TODO: Implement API call to fetch users
    // For now, we'll use mock data
    this.users = [
      { id: 1, username: 'admin1', email: 'admin1@example.com', role: 'Admin', status: 'Active' },
      { id: 2, username: 'doctor1', email: 'doctor1@example.com', role: 'Doctor', status: 'Active' },
      { id: 3, username: 'patient1', email: 'patient1@example.com', role: 'Patient', status: 'Active' },
      // Add more mock users here
    ];
    this.totalUsers = this.users.length;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.totalUsers / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedUsers = this.users.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onSearch(): void {
    // Implement search functionality
    const searchLower = this.searchTerm.toLowerCase();
    this.users = this.users.filter(user =>
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
    this.updatePagination();
  }

  filterByRole(): void {
    // Implement role filtering
    if (this.selectedRole) {
      this.users = this.users.filter(user => user.role === this.selectedRole);
    } else {
      this.loadUsers(); // Reset to all users
    }
    this.updatePagination();
  }

  addNewUser(): void {
    // TODO: Implement add new user functionality
    console.log('Add new user clicked');
  }

  editUser(user: any): void {
    // TODO: Implement edit user functionality
    console.log('Edit user clicked', user);
  }

}
