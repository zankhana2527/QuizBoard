import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzesComponent } from './navbar/quizzes/quizzes.component';
import { ResultsComponent } from './navbar/results/results.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { UserDashboardComponent } from './user-dashboard.component';

const routes: Routes = [{
  path: '',
  component: UserDashboardComponent,
  children: [
    {
      path: '',
      component: QuizzesComponent
    },
    {
      path: 'quizzes',
      component: QuizzesComponent
    },
    {
      path: 'user-result',
      component: ResultsComponent
    },
    {
      path: 'take-quiz/:id',
      component: TakeQuizComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
