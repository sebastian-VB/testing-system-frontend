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

  deleteQuestion(questionId: number){
    return this.http.delete(`${baserURL}/question/${questionId}`);
  }

  updateQuestion(question: QuestionPost): Observable<Question>{
    return this.http.put<Question>(`${baserURL}/question/`, question);
  }

  getOnlyQuestion(questionId: number): Observable<Question>{
    return this.http.get<Question>(`${baserURL}/question/${questionId}`);
  }

  listQuestionByExam(examId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${baserURL}/question/exam/${examId}`);
  }

}
