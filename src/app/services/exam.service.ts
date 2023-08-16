import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  public listExams(): Observable<any>{
    return this.http.get(`${baserURL}/exam/`);
  }

}
