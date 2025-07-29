import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css'
})
export class LeaveHistoryComponent {
  leaveHistory = [
    {date: '5 ม.ค. 2568' , type: "ลาพักร้อน",day:10, status: "อนุมัติ"},
    {date: '29 ก.ค. 2568' , type: "ลาป่วย",day:15, status: "อนุมัติ"}
  ]
}
