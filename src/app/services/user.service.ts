import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: any): Observable<User>{
    return this.http.post<User>(`${baserURL}/users/`, user);
  }
}
