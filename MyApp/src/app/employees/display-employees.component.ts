import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  private _activeRoutParam: number;
  confirmDelete = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

  ngOnInit() {
    this._activeRoutParam = +this._activatedRoute.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employee', this.employee.id],
    { queryParams: {'searchTerm': this.searchTerm}}); // Query string parameters
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with the ID = ${this.employee.id} Deleted`),
      (error: any) => console.log(error)
    );
    this.notifyDelete.emit(this.employee.id);
  }

}
