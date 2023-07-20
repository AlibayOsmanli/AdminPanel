import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddComponent } from '../emp-add/emp-add.component';
import { EmployeeService } from '../services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private dialog: MatDialog, private empService:EmployeeService) {  }

  ngOnInit(): void {
    this.getEmployees();
  }

  OpenForm() {
    const dialogRef = this.dialog.open(EmpAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val) {
          this.getEmployees();
        }
      }
    });
  }

  getEmployees() {
    this.empService.getEmployees().subscribe({
      next: (val:any) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number) {

    Swal.fire({
      title: 'Do you want to delete the employee?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success')
        this.empService.deleteEmployee(id).subscribe({
          next: (val:any) => {
            this.getEmployees();
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'error'
            )
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Not Deleted ', '', 'info')
      }
    })
  }

  editForm(data:any) {
    const dialogRef = this.dialog.open(EmpAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val) {
          Swal.fire(
            'Updated!',
            '',
            'success'
          )
          this.getEmployees();
        }
      }
    });
  }
}