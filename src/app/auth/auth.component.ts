import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isLogin = !this.isLogin;
  }
}
