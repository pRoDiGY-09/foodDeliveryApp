import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http : HttpClient) { }

  // Login function
  login(credentials : {email : string, password : string}) : Observable<{token : string}> {
    return this.http.post<{token : string}>(`${this.apiUrl}`, credentials).pipe(
      tap(response => {
        console.log('Login Successful:', response);
        localStorage.setItem('token', response.token); // Store the token in local storage
      }),
      catchError(this.errorHandler) // Handle the error
    );
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //error handler
  private errorHandler(error : HttpErrorResponse) {
    console.error('Login Failed:', error);
    return throwError(() => new Error('Login failed. Please check your credentials.'));
  }
}

