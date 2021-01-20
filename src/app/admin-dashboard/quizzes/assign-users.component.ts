import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent implements OnInit {


  users: any = [];
  selectedUsers: string[] = [];

  constructor(public dialogRef: MatDialogRef<AssignUsersComponent>, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.users = res.data.filter((user) => user.role !== 'admin');
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addUser(user) {
    if (this.selectedUsers.includes(user)) {
      // remove from array
      const userIndex = this.selectedUsers.indexOf(user);
      this.selectedUsers.splice(userIndex, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }
}
