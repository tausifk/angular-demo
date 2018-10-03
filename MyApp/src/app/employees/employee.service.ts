import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable()
export class EmployeeService {
    baseUrl = 'http://127.0.0.1:8000/employees'; // url for json-server http://localhost:3000/employees
    constructor(private _httpClient: HttpClient) { }

    private employees: Employee[];

    // create resource by POSTing, /employees
    addEmployee(employee: Employee): Observable<Employee> {
        return this._httpClient.post<Employee>(`${this.baseUrl}/`, employee, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .pipe(catchError(this.handleError));
    }
    // upadate resource by using PUT method, /employees/3
    updateEmployee(employee: Employee): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}/`, employee, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
            .pipe(catchError(this.handleError));
    }
    // retrieve list of resource using GET method, /employees
    getEmployees(): Observable<Employee[] | any> {
        return this._httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }
    // Error handling method for both server and client side errors.
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client Side Error: ', errorResponse.error.message);
        } else {
            console.log('Server Side Error: ', errorResponse);
        }
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later');
    }
    // retrieve a resource using GET method, /employee/3
    getEmployee(id: number): Observable<Employee> {
        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
    // deleting a resource using DELETE method, /employee/3
    deleteEmployee(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

}
