import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { SubmitApprovedComponent } from './submit-approved/submit-approved.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatTabsModule,
    CommonModule,
    DashboardComponent,
    LeaveHistoryComponent,
    LeaveRequestFormComponent,
    SubmitApprovedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
  changePage = 0;

  toSubmit(){
    this.changePage = 1;
  }

  toDashboard(){
    this.changePage = 0;
  }
  title = 'leaveFontend';
  toLogin() {
    this.router.navigate(['/login-regis']);
  }
}
