import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-assign-lead',
  templateUrl: './assign-lead.component.html',
  styleUrls: ['./assign-lead.component.scss']
})
export class AssignLeadComponent implements OnInit {

  users: any = [];
  selectedUsers: string[] = [];

  constructor(public dialogRef: MatDialogRef<AssignLeadComponent>, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

  addUser(id) {
    if (this.selectedUsers.includes(id)) {
      // remove from array
      const userIndex = this.selectedUsers.indexOf(id);
      this.selectedUsers.splice(userIndex, 1);
    } else {
      this.selectedUsers.push(id);
    }
    console.log(this.selectedUsers);
  }
}
