import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get isPasswordMatching() {
    return this.signUpForm.controls.password.value !== this.signUpForm.controls.confirmPassword.value;
  }


  onSubmit() {
    // console.log(this.signUpForm);
    const data = this.signUpForm.getRawValue();
    this.authService.signup(data).subscribe((res: any) => {
      console.log('res', res);
      if (res.statusCode === 200) {
        console.log('New user added');
        localStorage.setItem('accessToken', res.data.token);
        localStorage.setItem('Username', res.data.data.firstname);
        localStorage.setItem('Role', res.data.data.role);
        localStorage.setItem('user', JSON.stringify(res.data.data));
        this.router.navigate(['/user-dashboard']);
      } else {
        console.log(res.message);
      }
    }
    );
  }

}
