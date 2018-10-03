import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeeDetailsCanActivateGuard implements CanActivate {
    constructor(private _employeeService: EmployeeService,
        private _router: Router) { }

    // implementation for canActive method (not working after getting data from server, resolve this later)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployee(+route.paramMap.get('id'))
            .pipe(
                map(employee => {
                    const employeeExists = !!employee;
                    if (employeeExists) {
                        return true;
                    } else {
                        this._router.navigate(['notfound']);
                        return false;
                    }
                }),
                catchError((error) => {
                    console.log(error);
                    return of(false);
                })
            );
    }
}
