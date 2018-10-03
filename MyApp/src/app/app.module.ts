import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeesComponent } from './employees/display-employees.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsCanActivateGuard } from './employees/employee-details-can-active-guard.service';
import { EmployeeListResolveGuardService } from './employees/employee-list-resolve-guard.service';
import { AccordionComponent } from './shared/accordion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './authentication/login.component';
import { UserLoginService } from './authentication/user-login.service';
import { CanActivateLoginGuardService } from './authentication/can-activate-login-guard.service';
import { RegisterComponent } from './authentication/register.component';
import { JwtInterceptorService } from './authentication/jwt-intercepter.service';
import { ErrorInterceptorService } from './authentication/error-interceptor.service';



const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list',
  component: ListEmployeesComponent,
  resolve: {employeeList: EmployeeListResolveGuardService},
  canActivate: [CanActivateLoginGuardService]
  },
  { path: 'edit/:id',
  component: CreateEmployeeComponent,
  canDeactivate: [CreateEmployeeCanDeactivateGuardService],
  canActivate: [CanActivateLoginGuardService]
  },
  { path: 'employee/:id',
  component: EmployeeDetailsComponent,
  canActivate: [EmployeeDetailsCanActivateGuard, CanActivateLoginGuardService]
  },
  { path: 'notfound', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeesComponent,
    EmployeeDetailsComponent,
    PageNotFoundComponent,
    AccordionComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService, CreateEmployeeCanDeactivateGuardService,
    EmployeeDetailsCanActivateGuard, EmployeeListResolveGuardService,
    UserLoginService, CanActivateLoginGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
