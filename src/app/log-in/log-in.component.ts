import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.logInForm);
    const data = this.logInForm.getRawValue();
    this.authService.login(data.email, data.password).subscribe((res: any) => {
      if (res.statusCode === 200) {
        console.log('Login successful');
        localStorage.setItem('accessToken', res.data.token);
        localStorage.setItem('Username', res.data.user.firstname);
        localStorage.setItem('Role', res.data.user.role);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        if (res.data.user.role === 'user' || res.data.user.role === 'lead') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/admin-dashboard']);
        }

      } else {
        console.log('login-failed', res.message);
        this.snackBar.open(res.message, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
        });
      }
    });
  }




}
