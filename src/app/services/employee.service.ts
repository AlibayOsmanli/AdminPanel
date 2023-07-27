// employee.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000'; // Adjust the API URL based on your JSON Server configuration
  private tokenKey = 'auth_token';
  private usernameKey = 'username';

  username!: string;
  isLoggedIn = false;

  constructor(private http: HttpClient) {
    const authToken = this.getAuthToken();
    this.isLoggedIn = authToken ? true : false;
    this.username = this.getUserName();
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, data);
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employees/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${id}`, data);
  }

  // Log in the user
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<Credential[]>(`${this.apiUrl}/credentials?username=${username}&password=${password}`).pipe(
      tap(credentials => {
        if (credentials.length > 0) {
          const authToken = btoa(`${username}:${password}`); // Encode username and password as a base64 token
          this.setAuthToken(authToken); // Save the token to local storage
          this.isLoggedIn = true; // Set the login status to true
          this.setUserName(username); // Save the username to local storage
        }
      }),
      map(credentials => credentials.length > 0), // Check if credentials are found
      catchError(() => of(false)) // If there's an error, consider the login failed
    );
  }

  signup(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/credentials`, { username, password });
  }

  // Get the username from local storage
  getUserName(): string {
    return localStorage.getItem(this.usernameKey) || '';
  }

  // Save the username to local storage
  setUserName(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  setIsLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/credentials?username=${username}`)
      .pipe(
        map(credentials => credentials.length > 0)
      );
  }

  // Get the authentication token from local storage
  private getAuthToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  // Save the authentication token to local storage
  private setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Check if the user is logged in on the server-side
  checkLoggedIn(): Observable<boolean> {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return of(false);
    }
    return this.http.get<boolean>(`${this.apiUrl}/checkLoggedIn`).pipe(
      catchError(() => of(false)) // If there's an error, consider the user not logged in
    );
  }

  // Log in the user on the server-side
  setLoggedIn(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkLoggedIn`, { username });
  }

  // Log out the user
  logout(): void {
    this.setAuthToken(''); // Clear the token from local storage
    this.isLoggedIn = false; // Set the login status to false
    this.setUserName(''); // Clear the username from local storage
  }
}
