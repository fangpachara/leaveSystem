import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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

  userId = [
    { id: 1, name: "พชร ทีฆาวงค์"},
    { id: 2, name: "แมลง วัน"},
  ]

  formData = {
    leaveTypeId: '',
    userId: '',
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
    if (this.formData.leaveTypeId || this.formData.userId || this.formData.startDate || this.formData.endDate || this.formData.reason) {
      this.calLeaveDate()
      console.log("submitted", this.formData)
      this.http.post('http://localhost:8080/crate-request', this.formData)
      .subscribe({
        next: (response) => {
          console.log("Save Suscess", response)
        }
      })

    }
  }

  onClear() {
    this.formData = {
      leaveTypeId: '',
      userId: '',
      startDate: '',
      endDate: '',
      status: 'รออนุมัติ',
      reason: '',
      leaveDay: 0
    }
  }
}
