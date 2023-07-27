// header.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarResult: EventEmitter<any> = new EventEmitter();
  username: string | undefined;
  isLoggedIn = false;

  constructor(private router: Router, public authService: EmployeeService) {}

  ngOnInit(): void {
    this.authService.checkLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.username = this.authService.getUserName();
      }
    });
  }

  toggleSidebar() {
    this.toggleSidebarResult.emit();
  }

  logout() {
    this.authService.setUserName('');
    this.authService.isLoggedIn = false;
    this.authService.logout(); // Clear the token on logout
    this.router.navigate(['/login']);
  }
}
