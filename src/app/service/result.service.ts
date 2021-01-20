import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  resultBaseUri = 'http://localhost:3000/result';

  token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  sendResult(data: any) {
    console.log('In result api');
    return this.http.post(`${this.resultBaseUri}`, data, { headers: { auth: this.token } });
  }

  fetchResult() {
    console.log('in fetch result api');
    return this.http.get(`${this.resultBaseUri}`, { headers: { auth: this.token } });
  }

  fetchResultByUserId() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    return this.http.get(`${this.resultBaseUri}/user/${userId}`, { headers: { auth: this.token } });
  }

  fetchResultForLead() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    return this.http.get(`${this.resultBaseUri}/lead-result/${userId}`, { headers: { auth: this.token } });
  }
}
