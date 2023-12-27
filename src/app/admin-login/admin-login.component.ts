import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  login(): void {
    this.adminService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          alert('Login Successfull!!')
          this.router.navigate(['/employee-list']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        alert('Login Failed')
        console.error('Login failed:', error);
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}
