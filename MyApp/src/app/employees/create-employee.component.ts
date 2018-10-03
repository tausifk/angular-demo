import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  panelTitle: string;
  dataSavedSuccessfully: string;

  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'ADM' },
    { id: 4, name: 'HD' },
    { id: 5, name: 'MF' },
  ];

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY'

    });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }
  // if id param=0 than create form initialised with all null fields else 'employee' prop with respective employee.
  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null, name: null, gender: null, email: null, phoneNumber: null, contactPreference: null,
        dateOfBirth: null, department: '-1', isActive: null, photoPath: null
      };
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (error: any) => console.log(error)
      );
      this.panelTitle = 'Edit Employee';
    }
  }

  saveEmployee(): void {
    if (this.employee.id === null) {
      console.log(this.employee);
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset(); // reset() will clear all the fields on form (including dirty prop which calling Deactive guard)
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); },
        () => { this.dataSavedSuccessfully = 'Employeed saved successfully'; }
      );
    } else {
      console.log('From Create Comp: ' + this.employee);
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset(); // reset() will clear all the fields on form (including dirty prop which calling Deactive guard)
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); },
        () => { this.dataSavedSuccessfully = 'Employeed saved successfully'; }
      );

    }

  }
}
