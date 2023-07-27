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

  constructor(private router: Router, public authService: EmployeeService) {}

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarResult.emit();
  }

  logout() {
    this.authService.setUserName('');
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
