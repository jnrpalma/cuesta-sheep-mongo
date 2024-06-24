import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/dashboard/overview']);
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  register(email: string, password: string, displayName: string, photoURL: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, displayName, photoURL }).pipe(
      map((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/dashboard/overview']);
        return response;
      }),
      catchError(error => {
        console.error('Register error:', error);
        return of(null);
      })
    );
  }

  logout(): Promise<void> {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
    return Promise.resolve();
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(
      map(response => {
        console.log('Password reset link sent');
        return response;
      }),
      catchError(error => {
        console.error('Forgot password error:', error);
        return of(null);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    return of(!!token);
  }

  getUser(): Observable<any> {
    // Implement logic to retrieve user details from token or backend
    return of({
      displayName: 'User',
      email: 'user@example.com',
      firstName: 'User',
      photoURL: ''
    });
  }
}
