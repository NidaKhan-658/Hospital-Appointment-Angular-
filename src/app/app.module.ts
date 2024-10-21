import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Components/shared/shared.module';
import { UserModule } from './Components/users/user.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppointmentModule } from './Components/appointment/Appointment.module';
import { DatePipe } from './Components/shared/pipes/date.pipe';
import { StatusPipe } from './Components/shared/pipes/status.pipe';
import { AuthModule } from './Components/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DatePipe,
    StatusPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    ReactiveFormsModule,
    AuthModule,
    AppointmentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
