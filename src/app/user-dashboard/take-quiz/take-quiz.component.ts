import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultService } from '../../service/result.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {

  handleEvent(event) {
    if (event.action === 'notify') {
      this.snackBar.open('Hurry up', 'Ok', { duration: 3000 });
    }
    if (event.action === 'done') {
      this.snackBar.open('Quiz ended', 'Ok', { duration: 3000 });
      this.onSubmitQuiz();
    }
  }


  currentQuestion = 0;
  answers: any[] = [];
  quiz;
  questions: any[];
  quizStarted: boolean = false;
  submitted: boolean = false;
  percentage: number | string;
  startQuizDisabled: boolean = false;
  acheivedPassingMark: boolean = false;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private resultService: ResultService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // extract the id from url
    const id = this.route.snapshot.paramMap.get('id');

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
        this.startQuizDisabled = true;
        this.snackBar.open(res.message, 'Ok', { duration: 5000 });
      }
    });
  }

  onStartQuiz() {
    this.quizStarted = !this.quizStarted;
  }

  onNextQuestion() {
    this.currentQuestion = this.currentQuestion + 1;
  }

  onPreviousQuestion() {
    this.currentQuestion = this.currentQuestion - 1;
  }

  selectAnswer(questionId, selectedOptionId, isMultiSelect = false) {
    // check if question is already answered or not
    const isAlreadyAnswered = this.answers.some((answer) => {
      return answer.questionId === questionId;
    });
    if (isAlreadyAnswered) {
      this.answers = this.answers.map((answer) => {
        if (answer.questionId === questionId) {
          if (isMultiSelect) {
            const alreadyIncluded = answer.answerId.includes(selectedOptionId);
            if (alreadyIncluded) {
              answer.answerId.pop(selectedOptionId);
            } else {
              answer.answerId.push(selectedOptionId);
            }
          } else {
            answer.answerId = selectedOptionId;
          }
        }
        return answer;
      });
    } else {
      this.answers.push({ questionId, answerId: isMultiSelect ? [selectedOptionId] : selectedOptionId });
    }
    console.log('ANSWERS = ', this.answers);
  }

  getCorrectAnswersArray() {
    const correctAnswers = [];

    this.questions.forEach((que: any) => {
      const correctAnswerIds = [];
      que.options.forEach((op) => {
        if (op.isCorrect) {
          correctAnswerIds.push(op._id);
        }
      });
      correctAnswers.push({ questionId: que._id, correctAnswers: que.multiselect ? correctAnswerIds : correctAnswerIds[0] });
    });
    return correctAnswers;
  }

  contains(array, id) {
    return array.join("").search(id) === -1 ? false : true
  }

  isSelected(questionId, optionId) {
    const answer = this.answers.filter((ans) => ans.questionId === questionId);
    let status;
    if (answer.length > 0) {
      if (typeof answer[0].answerId === 'string') {
        status = answer[0].questionId === questionId && answer[0].answerId === optionId;
      }
      else {
        status = answer[0].questionId === questionId && answer[0].answerId.includes(optionId);
      }
    } else {
      return false;
    }
    return status;
  }

  onSubmitQuiz() {
    this.submitted = true;
    // calculate result - how many are true out
    const totalQuestions = this.questions.length;
    let correctAnswerCount: number = 0;
    const correctAnswers = this.getCorrectAnswersArray();

    // compare answers
    this.answers.forEach((answer: any) => {
      correctAnswers.forEach((corAns) => {
        if (answer.questionId === corAns.questionId) {
          if (typeof corAns.correctAnswers === 'string') {
            if (corAns.correctAnswers === answer.answerId) {
              correctAnswerCount = correctAnswerCount + 1;
            }
          } else {
            if (corAns.correctAnswers?.length === answer.answerId?.length) {
              const allCorrectAnswerIncluded = answer.answerId?.some((ansId) => {
                return !corAns.correctAnswers.includes(ansId);
              });
              if (!allCorrectAnswerIncluded) {
                correctAnswerCount = correctAnswerCount + 1;
              }
            }
          }
        }
      });
    });

    // calculate percentage

    this.percentage = ((correctAnswerCount / totalQuestions) * 100).toFixed(2);
    if (this.percentage < this.quiz.passingPercentage) {
      this.acheivedPassingMark = false;
    } else {
      this.acheivedPassingMark = true;
    }

    const data = {
      quizId: this.quiz._id,
      percentage: this.percentage,
      userId: JSON.parse(localStorage.getItem('user'))._id,
      status: this.acheivedPassingMark ? 'pass' : 'fail'
    };

    this.resultService.sendResult(data).subscribe((res: any) => {
      if (res.statusCode === 200) {
        console.log('result api =', res.message);
      } else {
        console.log('result api =', res.message);
      }
    })
  }

  onReappearTest() {
    this.answers = [];
    this.submitted = false;
    this.quizStarted = false;
    this.percentage = 0;
    this.currentQuestion = 0;
  }

}

