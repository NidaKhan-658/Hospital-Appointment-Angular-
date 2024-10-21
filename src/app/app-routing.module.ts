import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Components/Guards/auth.guard';


// Shared
import { HomeComponent } from './Components/shared/home/home.component';

// Auth
import { ForgotPasswordComponent } from './Components/auth/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';

// Appointment
import { AppointmentBookingComponent } from './Components/appointment/booking-appointment/appointment-booking.component';
import { AppointmentListComponent } from './Components/appointment/app-list/appointment-list.component';
import { AppointmentDetailComponent } from './Components/appointment/app-detail/appointment-detail.component';




//Admin
import { AdminDashboardComponent } from './Components/users/admin/admin-dashboard/admin-dashboard.component';
import { ReportGenerationComponent } from './Components/users/admin/report-generation/report-generation.component';
import { UserManagementComponent } from './Components/users/admin/user-management/user-management.component';



// Doctor
import { DoctorDashboardComponent } from './Components/users/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorDetailComponent } from './Components/users/doctor/doctor-detail/doctor-detail.component';
import { AppointmentReviewComponent } from './Components/users/doctor/appointment-review/appointment-review.component';


//Patient
import { PatientProfileComponent } from './Components/users/patient/patient-profile/patient-profile.component';
import { PatientDashboardComponent } from './Components/users/patient/patient-dashboard/patient-dashboard.component';
import { PatientDetailComponent } from './Components/users/patient/patient-detail/patient-detail.component';


const routes: Routes = [


  // Shared
  { path: '', component: HomeComponent,pathMatch: 'full' }, // Set home component as default route
  { path: 'home', component: HomeComponent },

  // Auth
  { path: 'forgot/password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./Components/auth/auth.module').then((m) => m.AuthModule),
  //   canActivate: [authGuard],
  //   data: { role: 'admin' },
  // },


  // Appointment
  { path: 'appointment', component: AppointmentBookingComponent },
  { path: 'appointment/list', component: AppointmentListComponent },
  { path: 'appointment/detail/:id', component: AppointmentDetailComponent },

  // Admin
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'admin/report', component: ReportGenerationComponent },
  { path: 'admin/user', component: UserManagementComponent },

  // Doctor
  { path: 'doctor/dashboard', component: DoctorDashboardComponent },
  { path: 'doctor/detail', component: DoctorDetailComponent },
  { path: 'doctor/review/:id', component: AppointmentReviewComponent },

  // Patient  
  { path: 'patients', component: PatientProfileComponent },
  { path: 'patient/dashboard', component: PatientDashboardComponent },
  { path: 'patient/detail/:id', component: PatientDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
