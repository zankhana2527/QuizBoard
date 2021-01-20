import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  statistics: any;
  greet: string;
  constructor(private authService: AuthService) { }

  firstname = localStorage.getItem('Username');

  ngOnInit() {
    this.greeting();
    this.authService.fetchStatistics().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.statistics = res.data;
      } else {
      }
    });
  }

  greeting() {
    const myDate = new Date();
    const hours = myDate.getHours();

    if (hours < 12) {
      this.greet = 'Good morning';
    } else if (hours >= 12 && hours <= 17) {
      this.greet = 'Good afternoon';
    } else if (hours >= 17 && hours <= 24) {
      this.greet = 'Good evening';
    }

  }

}
