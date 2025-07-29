import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface list{
  id: number;
  leaveTypeName: string;
  leaveTypeId: number;
  remainingDays: number;
  totalRemaining: number;
  totalLeaveDays: number;
  usedDays: number;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  

  constructor(private http: HttpClient){}
  
  leaveList : any = []
  leaveHistory : any = []
  pendingCount = 0;

  ngOnInit() {
    this.getLeaveHistory();
    this.getLeaveList();
  }
  getLeaveHistory(){
    this.http.get<list[]>('http://localhost:8080/getAll')
    .subscribe({
      next: (data) => {
          this.leaveHistory = data.sort((b, a)=> a.id - b.id); //เรียงจากล่าสุด
          //นับ PENDING
          this.pendingCount = this.leaveHistory.filter((item:any) => item.status === "PENDING").length;
          console.log(data)
        }
    })
  }
  getLeaveList(){
    this.http.get<list[]>('http://localhost:8080/GetBalances')
    .subscribe({
      next: (response) => {
          this.leaveList = response
        }
    })
  }
    
}
