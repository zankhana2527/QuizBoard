import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    if (confirm('Do you want to log out?')) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}

