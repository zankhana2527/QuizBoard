import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignUsersComponent } from './assign-users.component';

export interface Quizzes {
  title: string;
  creator: string;
  duration: string;
  status: string;
  passingPercentage: number;
  actions?: string;
}
// const QUIZZES_DATA: Quizzes[] = [
//   { title: 'javascript', creator: 'sam', duration: '30 min', actions: '' },
//   { title: 'html', creator: 'sam', duration: '30 min', actions: '' },
//   { title: 'css', creator: 'john', duration: '30 min', actions: '' },
//   { title: 'c++', creator: 'sam', duration: '30 min', actions: '' },
//   { title: 'node js', creator: 'john', duration: '30 min', actions: '' }
// ];

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})

export class QuizzesComponent implements OnInit {


  quizzes: Quizzes[] = [];
  displayedColumns: string[] = ['title', 'creator', 'duration', 'status', 'passingPercentage', 'actions'];

  constructor(private quizService: QuizService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.quizService.fetchQuiz().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.quizzes = res.data;
      } else {
        alert('No data found');
      }
    });
  }

  onCreate() {
    this.router.navigate(['/admin-dashboard/add-quiz']);
  }

  onAddQuestions(id) {
    this.router.navigate([`/admin-dashboard/add-questions/${id}`]);
  }

  onDeleteQuiz(id) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      // width: '250px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quizService.deleteQuiz(id).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.snackBar.open(res.message, 'Ok', { duration: 5000 });
            this.quizService.fetchQuiz().subscribe((quizRes: any) => {
              if (quizRes.statusCode === 200) {
                this.quizzes = quizRes.data;
              }
            });
          } else {
            this.snackBar.open(res.message, 'Ok', { duration: 5000 });
          }
        });
      }
    });
  }

  onMakeLive(id) {

    const dialogRef = this.dialog.open(AssignUsersComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.quizService.makeQuizLive(id, result).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.snackBar.open(res.message, 'OK', { duration: 3000 });
            this.quizService.fetchQuiz().subscribe((quizRes: any) => {
              if (quizRes.statusCode === 200) {
                this.quizzes = quizRes.data;
              } else {
                this.snackBar.open(quizRes.message, 'OK', { duration: 3000 });
              }
            });
          } else {
            this.snackBar.open(res.message, 'OK', { duration: 3000 });
          }
        });
      }
    });


    // this.quizService.makeQuizLive(id).subscribe((res: any) => {
    //   if (res.statusCode === 200) {
    //     this.snackBar.open(res.message, 'OK', { duration: 3000 });
    //     this.quizService.fetchQuiz().subscribe((quizRes: any) => {
    //       if (quizRes.statusCode === 200) {
    //         this.quizzes = quizRes.data;
    //       } else {
    //         this.snackBar.open(quizRes.message, 'OK', { duration: 3000 });
    //       }
    //     });
    //   } else {
    //     this.snackBar.open(res.message, 'OK', { duration: 3000 });
    //   }
    // });
  }

  onCloseQuiz(id) {
    this.quizService.closeQuiz(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.snackBar.open(res.message, 'OK', { duration: 3000 });
        this.quizService.fetchQuiz().subscribe((quizRes: any) => {
          if (quizRes.statusCode === 200) {
            this.quizzes = quizRes.data;
          } else {
            this.snackBar.open(quizRes.message, 'OK', { duration: 3000 });
          }
        });
      } else {
        this.snackBar.open(res.message, 'OK', { duration: 3000 });
      }
    })
  }

  onViewQuiz(id) {
    this.router.navigate([`/admin-dashboard/view-quiz/${id}`]);
  };

  onEditQuiz(id) {
    this.router.navigate(['/admin-dashboard/add-quiz'], { state: { quizId: id } });
  }

}



