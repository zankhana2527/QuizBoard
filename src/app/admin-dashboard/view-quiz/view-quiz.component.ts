import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {
  quiz;
  questions: any[];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('quizId');

    this.quizService.fetchQuizById(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.quiz = res.data;
      } else {
        alert('Error while fetching quiz');
      }
    });

    this.quizService.fetchQuestionsByQuizId(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.questions = res.data;
      } else {
        // alert(res.message);
        this.snackBar.open(res.message, 'Ok', { duration: 5000 });
      }
    });
  }

}
