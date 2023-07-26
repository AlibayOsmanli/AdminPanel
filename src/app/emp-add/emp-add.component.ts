import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {

  empForm!: FormGroup;

  education: string[] = [
    'No Formal Education',
    'High School',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree'
  ];

  constructor(private fb: FormBuilder, 
    private empService: EmployeeService, 
    private dialogRef: MatDialogRef<EmpAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],
   });

   this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val:any) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            Swal.fire({
              'title': 'Error',
              'icon': 'error'
            });
          }
        });
      }
      else{
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) => {
            Swal.fire({
              'title': 'Employee Added Successfully',
              'icon': 'success'
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            Swal.fire({
              'title': 'Error',
              'icon': 'error'
            });
          }
        });
      }
    }
  }
}
