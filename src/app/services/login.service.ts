import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import baserURL from './helper';
import { Observable, Subject } from 'rxjs';
import { TokenInfo } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //generar el token
  public generateToken(loginData: Login): Observable<TokenInfo>{
    return this.http.post<TokenInfo>(`${baserURL}/generate-token`, loginData);
  }

  //iniciamos sesion y establecemos el token en el localstorage
  public loginUser(tokenInfo: TokenInfo){
    localStorage.setItem('token', tokenInfo.token);
  }

  //comprar si hay token o no en el local storage
  public isLoggedIn(): boolean{

    let tokenStr = localStorage.getItem('token');

    if(tokenStr === undefined || tokenStr === '' || tokenStr === null){
      return false;
    }
    else{
      return true;
    }

  }

  //cerrar sesion y eliminar el token del localstorage
  public logout(): boolean{

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;

  }

  //obtener token
  public getToken(): string | null{
    return localStorage.getItem('token');
  }

  //almacenar un usuario
  public setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //obtener usuario
  public getUser(){

    let userStr = localStorage.getItem('user');

    if(userStr !== null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }

  }

  //obtener rol del usuario
  public getUserRole(){

    let user = this.getUser();
    return user.authorities[0].authority;

  }

  //obtener usuario actual
  public getCurrentUser(){
    return this.http.get(`${baserURL}/current-user`);
  }

}
