import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  newUserForm: FormGroup;
  mySub: Subscription = null;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
    })

  }

  register(): void {
    if (this.newUserForm.valid) {
      this.mySub = this.authService.register(this.newUserForm.value).subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => {
          this.toastr.success("Registration Successfull", "SUCCESS");
          this.router.navigate(['/login']);
        }
      })
    }
    else {
      this.toastr.warning("Please enter valid data", "WARNING");
    }
  }

  ngOnDestroy(): void {
    this.mySub?.unsubscribe();
  }
}
