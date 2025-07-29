import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-submit-approved',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './submit-approved.component.html',
  styleUrl: './submit-approved.component.css'
})
export class SubmitApprovedComponent {

  constructor(private http: HttpClient) { }
  @Output() toMain = new EventEmitter<void>();

  back(){
    this.toMain.emit();
  }

  approveList : any  = [];
  ngOnInit() {
    this.getApproveList();
  }

  getApproveList(){
    this.http.get<any[]>('http://localhost:8080/getAll')
    .subscribe({
      next: (response) => {
          this.approveList = response.filter((item:any) => item.status === "PENDING");
          console.log("list: ",this.approveList)
        }
    })
  }

  approved(status: string, id: number){
    this.http.put(`http://localhost:8080/PutRequest/${id}?status=${status}`,null)
    .subscribe({
      next: (data) => {
          console.log("status: ",status);
          this.getApproveList();
        }
    })
  }
}
