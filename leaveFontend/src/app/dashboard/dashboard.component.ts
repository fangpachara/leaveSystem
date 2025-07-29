import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface list{
  id: number;
  LeaveTypeName: string;
  RemainingDays: number;
  TotalRemaining: number;
  UsedDays: number;
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
      next: (response) => {
          console.log("Save Suscess", response)
          this.leaveHistory = response.sort((b, a)=> a.id - b.id); //เรียงจากล่าสุด
          //นับ PENDING
          this.pendingCount = this.leaveHistory.filter((item:any) => item.status === "PENDING").length;
        }
    })
  }
  getLeaveList(){
    this.http.get<list[]>('http://localhost:8080/GetBalances')
    .subscribe({
      next: (response) => {
          console.log("Save Suscess", response)
          this.leaveList = response
        }
    })
  }
    
}
