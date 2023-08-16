import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserURL from './helper';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  public listExams(): Observable<Exam[]>{
    return this.http.get<Exam[]>(`${baserURL}/exam/`);
  }

}
