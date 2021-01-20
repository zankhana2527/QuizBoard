import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../service/quiz.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  addQuiz: FormGroup;
  quizId: string;

  constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.quizId = history.state?.quizId;
    this.addQuiz = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      creator: ['', Validators.required],
      duration: [''],
      passingPercentage: ['']
    });
    if (this.quizId) {
      this.fetchQuizData();
    }
  }

  fetchQuizData() {
    this.quizService.fetchQuizById(this.quizId).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.addQuiz.patchValue({
          title: res.data.title,
          description: res.data.description,
          creator: res.data.creator,
          duration: res.data.duration,
          passingPercentage: res.data.passingPercentage
        });
      }
    });
  }

  submit() {
    const data = this.addQuiz.getRawValue();

    data.duration === '' && delete data.duration;
    data.passingPercentage === '' && delete data.passingPercentage;
    console.log(data);

    if (this.quizId) {
      this.quizService.updateQuiz(this.quizId, data).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/admin-dashboard/quizzes']);
          this.snackBar.open(res.message, 'Ok', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(res.message, 'Ok', {
            duration: 5000,
          });
        }
      });
    } else {
      this.quizService.addQuiz(data).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/admin-dashboard/quizzes']);
          this.snackBar.open(res.message, 'Ok', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(res.message, 'Ok', {
            duration: 5000,
          });
        }
      });
    }

  }

  onGoBack() {
    this.router.navigate(['/admin-dashboard/quizzes']);
  }
}
