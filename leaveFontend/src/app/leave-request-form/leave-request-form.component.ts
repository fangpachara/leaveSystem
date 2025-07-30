import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})
export class LeaveRequestFormComponent {

  constructor(private http: HttpClient){}

  leaveTypeId = [
    { id: 1, name: "ลาป่วย" },
    { id: 3, name: "ลาพักร้อน" },
    { id: 2, name: "ลากิจ" }
  ]
  leaveList: any = []
  leaveHistory: any = []
  pendingCount = 0;
  totalRemaining: number = 0;
  totalLeaveDays: number = 0;


  formData = {
    leaveTypeId: '',
    userId: 1,
    startDate: '',
    endDate: '',
    status: 'PENDING',
    reason: '',
    leaveDay: 0
  }



  calLeaveDate() {
    const startDate = new Date(this.formData.startDate)
    const endDate = new Date(this.formData.endDate)
    if (endDate < startDate) {
      alert("ใส่วันไม่ถูกต้อง")
      this.formData.endDate = ''
      return
    }
    if (startDate && endDate) {
      const days = endDate.getTime() - startDate.getTime();
      const day = Math.floor(days / (1000 * 3600 * 24) + 1)
      this.formData.leaveDay = day
    }

  }

  onSubmit() {
    if (this.formData.leaveTypeId && this.formData.startDate && this.formData.endDate && this.formData.reason) {
      this.calLeaveDate()
      console.log("submitted", this.formData)
      this.http.post('http://localhost:8080/crate-request', this.formData)
      .subscribe({
        next: (response) => {
          console.log("Save Suscess", response)
          alert("บันทึกข้อมูลสำเร็จ")
          this.onClear();
          this.getLeaveHistory();
        }
      })

    }
  }

  onClear() {
    this.formData = {
      leaveTypeId: '',
      userId: 1,
      startDate: '',
      endDate: '',
      status: 'รออนุมัติ',
      reason: '',
      leaveDay: 0
    }
  }

  ngOnInit() {
    this.getLeaveHistory();
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
}
