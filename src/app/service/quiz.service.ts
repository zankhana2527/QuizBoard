import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizBaseUri = 'http://localhost:3000/quiz';
  questionBaseUri = 'http://localhost:3000/question';

  token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  createQuiz(data: any) {
    console.log('in quiz create service');
    return this.http.post(`${this.quizBaseUri}`, data, { headers: { auth: this.token } });
  }

  fetchQuiz() {
    const status = localStorage.getItem('Role') === 'admin' ? '' : 'live';
    return this.http.get(`${this.quizBaseUri}?status=${status}`, { headers: { auth: this.token } });
  }

  addQuiz(data: any) {
    return this.http.post(`${this.quizBaseUri}`, data, { headers: { auth: this.token } });
  }

  updateQuiz(id: number | string, data) {
    return this.http.put(`${this.quizBaseUri}/${id}`, data, { headers: { auth: this.token } });
  }

  deleteQuiz(id: any) {
    return this.http.delete(`${this.quizBaseUri}/${id}`, { headers: { auth: this.token } });
  }

  // APIs to fetch all questions of given quiz id

  fetchQuizById(id) {
    return this.http.get(`${this.quizBaseUri}/${id}`, { headers: { auth: this.token } });
  }

  fetchQuestionsByQuizId(id) {
    return this.http.get(`${this.questionBaseUri}/${id}`, { headers: { auth: this.token } });
  }

  addQuestions(id, data) {
    return this.http.post(`${this.questionBaseUri}/${id}`, data, { headers: { auth: this.token } });
  }

  makeQuizLive(id, emails) {
    return this.http.put(`${this.quizBaseUri}/make-live/${id}`, emails, { headers: { auth: this.token } });
  }

  closeQuiz(id) {
    return this.http.put(`${this.quizBaseUri}/close-quiz/${id}`, {}, { headers: { auth: this.token } });
  }

}
