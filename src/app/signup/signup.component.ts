// signup.component.ts
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  isLoggedIn = false;

  constructor(private authService: EmployeeService, private router: Router) {}

  signup() {
    // Check if the username and password fields are not empty
    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter both username and password'
      });
      return;
    }

    // Check if the username already exists
    this.authService.checkUsernameExists(this.username).subscribe(
      (usernameExists: boolean) => {
        if (usernameExists) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username already exists. Please choose a different username.'
          });
        } else {
          // Proceed with signup
          this.authService.signup(this.username, this.password).subscribe(
            () => {
              // handle successful signup
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Signup successful!'
              });
              // Log in the user
              this.authService.login(this.username, this.password).subscribe(
                isLoggedIn => {
                  if (isLoggedIn) {
                    this.authService.setIsLoggedIn(true);
                    this.authService.setUserName(this.username);
                    // Redirect to home component
                    this.router.navigate(['/home']);
                  } else {
                    // handle login error
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Error occurred during login after signup'
                    });
                  }
                },
                () => {
                  // handle login error
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error occurred during login after signup'
                  });
                }
              );
            },
            () => {
              // handle signup error
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error occurred during signup'
              });
            }
          );
        }
      },
      () => {
        // handle API error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error occurred while checking username availability'
        });
      }
    );
  }
}
