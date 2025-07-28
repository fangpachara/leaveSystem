import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveBalanceDisplayComponent } from './leave-balance-display/leave-balance-display.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatTabsModule,
    CommonModule,
    DashboardComponent,
    LeaveBalanceDisplayComponent,
    LeaveHistoryComponent,
    LeaveRequestFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'leaveFontend';
}
