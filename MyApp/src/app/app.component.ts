import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { UserLoginService } from './authentication/user-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator = true;
  currentUserNameToDisplay: string;
  userLogged: string;

  constructor(private _router: Router,
              private userLoginService: UserLoginService) {
    this._router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd
          || routerEvent instanceof NavigationCancel
          || routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false;
      }
    }
    );

    // if (localStorage.getItem('currentUser')) { to show loggedin user
    //   this.userLogged = localStorage.getItem('currentUser');
    //   this.userLogged = JSON.parse(this.userLogged).username;
    //   console.log('From List Comp: ' + this.userLogged);
    // } else {
    //   this.userLogged = '';
    // }

  }

  logoutFunction() {
    this.userLoginService.logout();
    this._router.navigate(['/login']);
  }

}
