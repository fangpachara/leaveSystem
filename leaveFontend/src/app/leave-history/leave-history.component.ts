import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-leave-history',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css'
})
export class LeaveHistoryComponent {
  leaveHistory : any = []

  department = [
    { id: 1, name: "CEO" }
  ]


  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('http://localhost:8080/get-leavetype-all')
    .subscribe({
      next: (response) => {
          this.leaveHistory = response
        }
    })

  }


  fileName = 'leaveHistory.xlsx'
  exportFile(){
    /**passing table id**/
    let data = document.getElementById('leaveHistoryTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  
}
