import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ResultAdminComponent } from './result-admin/result-admin.component';
import { UsersComponent } from './users/users.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';

const routes: Routes = [{
  path: '',
  component: AdminDashboardComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'quizzes',
      component: QuizzesComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'add-quiz',
      component: AddQuizComponent
    },
    {
      path: 'add-questions/:id',
      component: AddQuestionsComponent
    },
    {
      path: 'view-quiz/:quizId',
      component: ViewQuizComponent
    },
    {
      path: 'result-admin',
      component: ResultAdminComponent
    }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
