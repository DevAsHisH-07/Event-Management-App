import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeListUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeListUrl);
  }
  getEmployeeById(id: number): Observable<any> {
    const url = `${this.employeeListUrl}/${id}`;
    return this.http.get<any>(url);
  }
  updateEmployee(id: number, employeeData: any): Observable<any> {
    const url = `${this.employeeListUrl}/${id}`;
    return this.http.put<any>(url, employeeData);
  }

  deleteEmployee(id: number): Observable<any> {
    const url = `${this.employeeListUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  addEmployee(newEmployee: any): Observable<any> {
    return this.http.post<any>(this.employeeListUrl, newEmployee);
  }
}
