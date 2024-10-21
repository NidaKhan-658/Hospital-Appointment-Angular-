import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientService } from '../../../Services/patient.service';
import { FormsModule } from '@angular/forms';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';


@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientProfileComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    PatientDashboardComponent,
    PatientProfileComponent,
    PatientDetailComponent
  ],
  providers:[PatientService]
})
export class PatientModule { }
