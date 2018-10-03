import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  errorMessage: string;

  constructor(
              private formBuilder: FormBuilder,
              private userLoginService: UserLoginService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });

    // reset login status
    this.userLoginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

   // convenience getter for easy access to form fields
   get f() {
     return this.loginForm.controls;
   }

   onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.loginForm.invalid) {
       return;
     }

     this.loading = true;
     this.userLoginService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl], { queryParams: { 'currentUserName': data.username }});
          console.log('From login Component: ' + data.username);
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        });
   }

}
