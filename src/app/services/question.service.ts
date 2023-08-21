import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, QuestionPost } from '../models/question';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  listExamQuestion(examId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${baserURL}/question/exam/all/${examId}`);
  }

  saveQuestion(question: QuestionPost): Observable<Question>{
    return this.http.post<Question>(`${baserURL}/question/`, question);
  }
}
