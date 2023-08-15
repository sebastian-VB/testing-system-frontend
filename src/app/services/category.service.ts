import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catgeory } from '../models/category';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public listCategories(): Observable<Catgeory[]>{
    return this.http.get<Catgeory[]>(`${baserURL}/category/`);
  }

  public addCategory(category: Catgeory): Observable<Catgeory>{
    return this.http.post<Catgeory>(`${baserURL}/category/`, category);
  }

}
