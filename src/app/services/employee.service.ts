import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  username!: string;
  isLoggedIn = false;

  constructor(private http:HttpClient) { }

  addEmployee(data:any): Observable<any> {
    return this.http.post("http://localhost:3000/employees", data);
  }

  getEmployees(): Observable<any> {
    return this.http.get("http://localhost:3000/employees");
  }

  deleteEmployee(id:number): Observable<any> {
    return this.http.delete("http://localhost:3000/employees/" + id);
  }

  updateEmployee(id:number, data:any): Observable<any> {
    return this.http.put("http://localhost:3000/employees/" + id, data);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<Credential[]>(`http://localhost:3000/credentials?username=${username}&password=${password}`)
      .pipe(
        map(credentials => credentials.length > 0)
      );
  }

  signup(username: string, password: string) {
    return this.http.post(`http://localhost:3000/credentials`, { username, password });
  }

  setUserName(username: string) {
    this.username = username;
  }
  getUserName() {
    return this.username;
  }

  setIsLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(`http://localhost:3000/credentials?username=${username}`)
      .pipe(
        map(credentials => credentials.length > 0)
      );
  }


  
}
