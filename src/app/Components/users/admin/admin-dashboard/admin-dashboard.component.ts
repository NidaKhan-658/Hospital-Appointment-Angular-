import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../Services/appointment.service';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  statistics: any = {};

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.appointmentService.getAppointmentStatistics().subscribe(
      (appointmentStats) => {
        this.statistics.totalAppointments = appointmentStats.total;
        this.statistics.completedAppointments = appointmentStats.completed;
        this.statistics.cancelledAppointments = appointmentStats.cancelled;
        this.statistics.pendingAppointments = appointmentStats.pending;
      }
    );

    this.authService.getUserStatistics().subscribe(
      (userStats) => {
        this.statistics.totalUsers = userStats.total;
        this.statistics.doctors = userStats.doctors;
        this.statistics.patients = userStats.patients;
      }
    );
    // this.statistics = {
    //   totalAppointments: 120,
    //   completedAppointments: 85,
    //   cancelledAppointments: 15,
    //   pendingAppointments: 20,
    //   totalUsers: 500,
    //   doctors: 50,
    //   patients: 450
    // };
  }
}
