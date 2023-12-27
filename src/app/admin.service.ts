import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminCredentialsUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  getAdminCredentials(): Observable<any> {
    return this.http.get(this.adminCredentialsUrl);

}
login(username: string, password: string): Observable<any> {
  return this.getAdminCredentials().pipe(
    switchMap((credentials: any) => {
      // Simulate a backend request to validate admin credentials
      if (username === credentials.username && password === credentials.password) {
        return of({ success: true });
      } else {
        return of({ success: false });
      }
    }),
    catchError((error) => {
      console.error('Failed to fetch admin credentials:', error);
      return of({ success: false });
    })
  );
}

updateAdminDetails(newDetails: any): Observable<any> {
  return this.http.put(this.adminCredentialsUrl, newDetails);
}
}
