import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('URLLLLL =', url);

    const extractedUrl = url !== '/' ? url.split('/')[1] : url;
    const role = localStorage.getItem('Role');
    const token = localStorage.getItem('accessToken');

    if (extractedUrl === 'admin-dashboard' && role === 'admin' && token) {
      return true;
    } else if (extractedUrl === 'admin-dashboard' && (role === 'user' || role === 'lead') && token) {
      this.router.navigate(['/user-dashboard']);
      return false;
    } else if (extractedUrl === 'user-dashboard' && (role === 'user' || role === 'lead') && token) {
      return true;
    } else if (extractedUrl === 'user-dashboard' && role === 'admin' && token) {
      this.router.navigate(['/admin-dashboard']);
      return false;
    } else {
      let temp;
      if (role === 'admin') {
        console.log('In admin condition')
        this.router.navigate(['/admin-dashboard']);
        temp = false
      } else if (role === 'user') {
        this.router.navigate(['/user-dashboard']);
        temp = false
      } else {
        this.router.navigate(['/']);
        temp = true
      }
      return temp;
    }
  }
}
