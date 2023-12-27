// src/app/employee-details/employee-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
    const employeeIdParam = this.route.snapshot.paramMap.get('id');
  
    if (employeeIdParam !== null) {
      const employeeId = +employeeIdParam;
      this.employeeService.getEmployeeById(employeeId).subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.error('Failed to load employee details:', error);
        }
      );
    } else {
      console.error('Employee ID parameter is null.');
    }
  }
  updateEmployee(): void {
    // Navigate to the employee update page with the employee ID
    this.router.navigate(['/employee-update', this.employee.id]);
  }

  deleteEmployee(): void {
    // Implement the logic for deleting the employee
    const employeeId = this.employee.id;

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (data) => {
        alert('Employee deleted successfully:');
        this.router.navigate(['/employee-list'])
        
      },
      (error) => {
        console.error('Failed to delete employee:', error);
      }
    );
  }


  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
