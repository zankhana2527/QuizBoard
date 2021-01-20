import { OnInit, Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: []
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }
}
