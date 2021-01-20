import { Component, OnInit } from '@angular/core';
import { QuizService } from './../../../service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Quizzes {
  title: string;
  creator: string;
  duration: string;
  passingPercentage: number;
}

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quiz;
  questions: [];
  quizzes: Quizzes[] = [];
  displayedColumns: string[] = ['title', 'creator', 'duration', 'passingPercentage', 'take test'];

  constructor(private quizService: QuizService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.quizService.fetchQuiz().subscribe((res: any) => {
      console.log('user-dashboard', res);
      if (res.statusCode === 200) {
        this.quizzes = res.data;
      } else {
        alert('No data found');
      }
    });
  }

  onTakeQuiz(id) {

    this.quizService.fetchQuiz().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.questions = res.data;
        this.router.navigate([`/user-dashboard/take-quiz/${id}`]);
      } else {
        alert(res.message);
        this.snackBar.open(res.message, 'Ok', { duration: 5000 });
      }
    });
  }

}
