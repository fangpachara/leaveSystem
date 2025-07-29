import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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

  leaveType = [
    { id: 1, name: "ลาป่วย" },
    { id: 2, name: "ลาพักร้อน" },
    { id: 3, name: "ลากิจ" }
  ]

  formData = {
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'รออนุมัติ',
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
    if (this.formData.leaveType || this.formData.startDate || this.formData.endDate || this.formData.reason) {
      this.calLeaveDate()

      console.log("submitted", this.formData)
    }
  }

  onClear() {
    this.formData = {
      leaveType: '',
      startDate: '',
      endDate: '',
      status: 'รออนุมัติ',
      reason: '',
      leaveDay: 0
    }
  }
}
