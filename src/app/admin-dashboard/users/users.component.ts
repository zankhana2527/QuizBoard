import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AssignLeadComponent } from './assign-lead/assign-lead.component';


export interface Users {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];


  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((res: any) => {
      console.log('response', res);
      this.users = res.data;
    })
  }

  onMakeLead(userId, firstname, lastname) {
    // console.log('Change role', userId);

    const dialogRef = this.dialog.open(AssignLeadComponent, {
      data: { name: firstname + ' ' + lastname }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (result.length === 0) {
        this.snackBar.open('Please at least assign one user', 'Ok', { duration: 3000 })
        return;
      }
      this.authService.makeLead(userId, result).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.snackBar.open(res.message, 'Ok', { duration: 3000 });
          this.users = this.users.map((user: any) => {
            if (user._id === userId) {
              user.role = 'lead';
            }
            return user;
          });
        } else {
          this.snackBar.open(res.message, 'Ok', { duration: 3000 });
        }
      });
    })
  }

  onMakeUser(userId) {
    console.log('Change role', userId);
    this.authService.makeUser(userId).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.snackBar.open(res.message, 'Ok', { duration: 3000 });
        this.users = this.users.map((user: any) => {
          if (user._id === userId) {
            user.role = 'user';
          }
          return user;
        });
      } else {
        this.snackBar.open(res.message, 'Ok', { duration: 3000 });
      }
    });
  }


}
