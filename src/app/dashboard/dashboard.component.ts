import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalDrivers: number = 0;
  totalTankers: number = 0;
 constructor(private adminService: AdminService ,private router:Router) {}

  ngOnInit(): void {
    this.getCounts();
  }

  getCounts() {
    this.adminService.getDriver().subscribe({
      next: (res: any) => {
        this.totalDrivers = res.length;
        console.log('Total Drivers:', this.totalDrivers);
      },
      error: (error: any) => {
        console.error('Error fetching drivers:', error);
      }
    
    });
    this.adminService.getTanker().subscribe({
      next: (res: any) => {
        this.totalTankers = res.length;
        console.log('Total Tankers:', this.totalTankers);
      },
      error: (error: any) => {
        console.error('Error fetching tankers:', error);
      }
    });
  }
    logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}

  
}


