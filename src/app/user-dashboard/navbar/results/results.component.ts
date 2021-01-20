import { ResultService } from '../../../service/result.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {


  result: any = [];
  displayedColumns: string[] = ['#', 'quizName', 'userName', 'passingPercentage', 'percentage', 'status'];
  role = localStorage.getItem('Role');

  constructor(private resultService: ResultService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    if (this.role === 'lead') {
      this.resultService.fetchResultForLead().subscribe((leadRes: any) => {
        // console.log('lead result', leadRes);
        leadRes.data = leadRes.data.map((r) => {
          console.log('r', r);
          return {
            ...r,
            quizId: r.quizId,
            quizName: r.quizId.title,
            userName: r.userId.firstname + ' ' + r.userId.lastname,
            passingPercentage: r.quizId.passingPercentage
          };
        });
        this.result = new MatTableDataSource(leadRes.data);
        this.result.sort = this.sort;
      });
    }
    if (this.role === 'user') {
      this.resultService.fetchResultByUserId().subscribe((res: any) => {
        if (res.statusCode === 200) {
          // this.result = res.data;
          res.data = res.data.map((r) => {
            console.log('r', r);
            return {
              ...r,
              quizId: r.quizId,
              quizName: r.quizId.title,
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.result.filter = filterValue.trim();
  }

}
