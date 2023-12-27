// admin-update.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css'],
})
export class AdminUpdateComponent implements OnInit {
  adminDetails: any = {}; // Placeholder for admin details

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    // Load admin details when the component initializes
    this.loadAdminDetails();
  }

  loadAdminDetails(): void {
    this.adminService.getAdminCredentials().subscribe(
      (data) => {
        this.adminDetails = data;
      },
      (error) => {
        console.error('Failed to load admin details:', error);
      }
    );
  }

  updateAdmin(): void {
    // Implement your logic to update admin details
    // You can use the AdminService to make a PUT request to update the admin details
    const newCredentials = {
      username: this.adminDetails.username,
      password: this.adminDetails.password,
    };

    this.adminService.updateAdminDetails(newCredentials).subscribe(
      (data) => {
        alert('Admin details updated successfully!');
        // Optionally, navigate to the desired page
        this.router.navigate(['/employee-list']);
      },
      (error) => {
        alert('Failed to update admin details. Please try again.');
        console.error('Failed to update admin details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
