import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AppointmentReviewComponent } from './appointment-review/appointment-review.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    AppointmentReviewComponent,
    DoctorDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    DoctorDashboardComponent,
    AppointmentReviewComponent, 
    DoctorDetailComponent
  ]
})
export class DoctorModule { }
