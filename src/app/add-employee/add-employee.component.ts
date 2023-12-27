import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  newEmployee: any = { id: null, 
  first_name: '',
  last_name: '',
  email: '',
  };

  constructor(private router: Router, private employeeService: EmployeeService) {}

  saveEmployee(): void {
    // Use the service to add the new employee
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      (data) => {
        // Handle success if needed
        alert('Employee added successfully!');
        // Optionally, navigate to the employee list page or any other page
        this.router.navigate(['/employee-list']);
      },
      (error) => {
        // Handle error if needed
        alert('Failed to add employee. Please try again.');
        console.error('Failed to add employee:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
