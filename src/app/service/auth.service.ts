import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:3000/user';

  token = localStorage.getItem('accessToken');
  constructor(private http: HttpClient) { }

  login(email, password) {
    console.log('in service');
    return this.http.post(`${this.uri}/login`, { email, password });
  }

  signup(data: any) {
    console.log('in service2');
    return this.http.post(`${this.uri}`, data);
  }

  getUsers() {
    return this.http.get(`${this.uri}`, { headers: { auth: this.token } });
  }

  makeUser(id) {
    return this.http.put(`${this.uri}/make-user/${id}`, {}, { headers: { auth: this.token } });
  }

  makeLead(id, result) {
    return this.http.put(`${this.uri}/make-lead/${id}`, { assignedUsers: result }, { headers: { auth: this.token } });
  }

  fetchStatistics() {
    return this.http.get(`${this.uri}/statistics`, { headers: { auth: this.token } });
  }
}
