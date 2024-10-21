import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportGenerationComponent } from './report-generation/report-generation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ReportGenerationComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    AdminDashboardComponent,
    ReportGenerationComponent,
    UserManagementComponent
  ]
})
export class AdminModule { }
