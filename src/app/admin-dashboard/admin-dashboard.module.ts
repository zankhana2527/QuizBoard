import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { UsersComponent } from './users/users.component';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';


import { AddQuizComponent } from '../admin-dashboard/add-quiz/add-quiz.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ResultAdminComponent } from './result-admin/result-admin.component';
import { ConfirmationDialogComponent } from './quizzes/confirmation-dialog.component';
import { AssignUsersComponent } from './quizzes/assign-users.component';
import { AssignLeadComponent } from './users/assign-lead/assign-lead.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    QuizzesComponent,
    UsersComponent,
    AddQuizComponent,
    AddQuestionsComponent,
    ViewQuizComponent,
    ResultAdminComponent,
    ConfirmationDialogComponent,
    AssignUsersComponent,
    AssignLeadComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class AdminDashboardModule { }
