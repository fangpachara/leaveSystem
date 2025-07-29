import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter} from '@angular/core';

interface list {
  id: number;
  leaveTypeName: string;
  leaveTypeId: number;
  remainingDays: number;
  usedDays: number;
  startDate: string;
  endDate: string;
  status: string;
  totalRemaining: number;
  totalLeaveDays: number;
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

  @Output() toSubmitPage = new EventEmitter<void>();


  constructor(private http: HttpClient) { }

  leaveList: list[] = []
  leaveHistory: list[] = []
  pendingCount = 0;
  totalRemaining: number = 0;
  totalLeaveDays: number = 0;

  ngOnInit() {
    this.getLeaveHistory();
    this.getLeaveList();
  }
  getLeaveHistory() {
    this.http.get<list[]>('http://localhost:8080/getAll')
      .subscribe({
        next: (data) => {
          this.leaveHistory = data.sort((b, a) => a.id - b.id); //เรียงจากล่าสุด
          //นับ PENDING
          this.pendingCount = this.leaveHistory.filter((item: any) => item.status === "PENDING").length;
          console.log(data)
        }
      })
  }
  getLeaveList() {
    this.http.get<list[]>('http://localhost:8080/GetBalances')
      .subscribe({
        next: (response) => {
          this.leaveList = response
          this.totalLeaveDays = response[0]?.totalLeaveDays || 0;
          this.totalRemaining = response[0]?.totalRemaining || 0;
        }
      })
  }

  toSubmit(){
    this.toSubmitPage.emit();
  }

}
