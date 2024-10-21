import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule, 
    PatientModule, 
    DoctorModule,
    AdminModule
  ],
  exports:[
    PatientModule,
    DoctorModule,AdminModule
  ]
})
export class UserModule { }
