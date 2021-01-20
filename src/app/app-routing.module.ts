import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService as AuthGuard } from './guard/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
