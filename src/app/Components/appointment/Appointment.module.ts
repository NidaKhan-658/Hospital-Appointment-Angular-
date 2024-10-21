import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDetailComponent } from './app-detail/appointment-detail.component';
import { AppointmentBookingComponent } from './booking-appointment/appointment-booking.component';
import { AppointmentListComponent } from './app-list/appointment-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../Services/appointment.service';
@NgModule({
  declarations: [
    AppointmentDetailComponent,
    AppointmentBookingComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    AppointmentDetailComponent,
    AppointmentBookingComponent,
    AppointmentListComponent
  ],
  providers:[
    AppointmentService
  ]
})
export class AppointmentModule { }
