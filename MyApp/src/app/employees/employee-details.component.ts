import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  private _empId: number;

  constructor(private _activatedRout: ActivatedRoute,
              private _employeeService: EmployeeService,
              private _router: Router) { }

  ngOnInit() {
    this._activatedRout.paramMap.subscribe(param => {
        this._empId = +param.get('id');     // convert id-str to id-int
        this._employeeService.getEmployee(this._empId).subscribe(
                                                                  (emp) =>  this.employee = emp,
                                                                  (error: any) => console.log(error)
                                                                );
    });
  }

  nextEmployee() {
    if (this._empId < 3) {
      this._empId += 1;
    } else {
      this._empId = 1;
    }
    this._router.navigate(['/employee', this._empId],
    {queryParamsHandling: 'preserve'});
  }

}
