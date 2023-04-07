import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  mySub: Subscription = null;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.mySub = this.authService.login(this.loginForm.value).subscribe({
        next: (val) => {
          console.log(val);
          this.authService.storeToken(val);
        },
        error: (err) => { console.log(err) },
        complete: () => {
          this.toastr.success("Login Successfull");
          this.router.navigate(['/products'])
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.mySub?.unsubscribe();
  }
}
