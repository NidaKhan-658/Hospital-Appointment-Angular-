import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppointmentModule } from "../appointment/Appointment.module";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppointmentModule,
],
  exports:[
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ]
})
export class SharedModule { }
