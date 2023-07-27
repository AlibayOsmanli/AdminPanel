// login.component.ts
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn = false;

  constructor(private authService: EmployeeService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          // handle successful login
          this.authService.setUserName(this.username);
          this.authService.setIsLoggedIn(true);
          this.router.navigate(['/home']); 
        } else {
          // handle login error
          Swal.fire({
            icon: 'error',
            title: 'Invalid username or password',
            text: 'Please check your credentials and try again'
          });
        }
      },
      error => {
        // handle login error 
        Swal.fire({
          icon: 'error',
          title: 'Error occurred during login',
          text: 'Please try again later'
        });
      }
    );
  }
}
