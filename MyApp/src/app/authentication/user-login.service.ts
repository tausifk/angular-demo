import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const TOKEN = 'TOKEN';

@Injectable()
export class UserLoginService {
    baseUrl = 'http://127.0.0.1:8000'; // url for json-server http://localhost:3000/employees

    constructor(private _httpCLient: HttpClient) { }

    login(username: string, password: string) {
        return this._httpCLient.post<any>(`${this.baseUrl}/login/`, {username: username, password: password})
            .pipe(map( user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    register(user: User) {
        return this._httpCLient.post(`${this.baseUrl}/users/register`, user);
    }

    isUserLoggedin() {
        return localStorage.getItem('currentUser') !== null;
    }

}
