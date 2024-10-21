import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService,Appointment } from '../../../Services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
 
  appointmentDetails: Appointment|any;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getAppointmentDetails();
    });
  }

  getAppointmentDetails(): void {
    this.appointmentService.getAppointmentById(this.appointmentDetails.id).subscribe(
      (data) => {
        this.appointmentDetails = data;
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }


}
