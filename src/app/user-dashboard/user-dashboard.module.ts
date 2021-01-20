import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { QuizzesComponent } from './navbar/quizzes/quizzes.component';
import { ResultsComponent } from './navbar/results/results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { CountdownModule } from 'ngx-countdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UserDashboardComponent,
    NavbarComponent,
    HeaderComponent,
    QuizzesComponent,
    ResultsComponent,
    TakeQuizComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    CountdownModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UserDashboardModule { }
