import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResultService } from '../../service/result.service';
import { MatSort } from '@angular/material/sort';

export interface Result {
  quizId: string;
  userId: string;
  passingPercentage: number;
  status: string;
}

@Component({
  selector: 'app-result-admin',
  templateUrl: './result-admin.component.html',
  styleUrls: ['./result-admin.component.scss']
})
export class ResultAdminComponent implements AfterViewInit {

  result: any = [];
  displayedColumns: string[] = ['#', 'quizName', 'userName', 'passingPercentage', 'percentage', 'status'];

  constructor(private resultService: ResultService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.resultService.fetchResult().subscribe((res: any) => {
      if (res.statusCode === 200) {
        // this.result = res.data;
        res.data = res.data.map((r) => {
          return {
            ...r,
            quizId: r.quizId,
            userId: r.userId,
            quizName: r.quizId.title,
            userName: r.userId.firstname + ' ' + r.userId.lastname,
            passingPercentage: r.quizId.passingPercentage
          };
        });
        this.result = new MatTableDataSource(res.data);
        this.result.sort = this.sort;
      } else {
        console.log('Add error in snackbar!');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.result.filter = filterValue.trim();
  }

}
