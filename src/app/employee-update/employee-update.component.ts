// src/app/employee-update/employee-update.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
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
    // Implement the logic for updating the employee details
    const employeeId = this.employee.id;
    const updatedEmployeeData = {       
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email, 
    };

    this.employeeService.updateEmployee(employeeId, updatedEmployeeData).subscribe(
      (data) => {
        console.log('Employee updated successfully:', data);
        // Optionally, you can navigate to a different page after the update
        this.router.navigate(['/employee-details', employeeId]);
      },
      (error) => {
        console.error('Failed to update employee:', error);
      }
    );
  }

  goBack(): void {
    // Navigate back to the employee details page
    this.router.navigate(['/employee-details', this.employee.id]);
  }
}
