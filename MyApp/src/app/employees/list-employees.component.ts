import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  private _searchTerm: string;
  filteredEmployees: Employee[];
  error: any;
  currentUserName: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredEmployees = this.filtereEmployees(val);
  }

  constructor(private _activatedRout: ActivatedRoute) {
    const resolvedData = this._activatedRout.snapshot.data['employeeList'];

    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this._activatedRout.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._activatedRout.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this.currentUserName = this._activatedRout.snapshot.queryParamMap.get('currentUserName');
    // console.log('From List Component: ' + this.currentUserName);
  }

  filtereEmployees(searchString: string): Employee[] {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(emp => emp.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

}
