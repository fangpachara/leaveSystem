import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  leaveHistory : any = []

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('http://localhost:8080/getAll')
    .subscribe({
      next: (response) => {
          this.leaveHistory = response
        }
    })

  }

  
}
