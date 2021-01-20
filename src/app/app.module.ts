import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AuthComponent } from './auth/auth.component';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    AdminDashboardModule,
    UserDashboardModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
