import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserURL from './helper';
import { Exam, ExamPost } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  public listExams(): Observable<Exam[]>{
    return this.http.get<Exam[]>(`${baserURL}/exam/`);
  }

  public saveExam(exam: ExamPost): Observable<Exam>{
    return this.http.post<Exam>(`${baserURL}/exam/`, exam);
  }

  public deleteExam(examId: number){
    return this.http.delete(`${baserURL}/exam/${examId}`);
  }

  public getExam(examId: number): Observable<Exam>{
    return this.http.get<Exam>(`${baserURL}/exam/${examId}`);
  }

  public updateExam(exam: ExamPost): Observable<Exam>{
    return this.http.put<Exam>(`${baserURL}/exam/`, exam);
  }

  public listExamByCategory(categoryId: number): Observable<Exam[]>{
    return this.http.get<Exam[]>(`${baserURL}/exam/category/${categoryId}`);
  }

}
