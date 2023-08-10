import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{

  username: string;

  constructor(public loginSvc: LoginService, private router: Router){}
  
  ngDoCheck(): void {
    if(localStorage.getItem('user') !== null){
      //console.log(this.loginSvc.getUser().username);
      this.username = this.loginSvc.getUser().username;
    }
  }

  logout(): void{
    this.loginSvc.logout();
    this.router.navigate(['login']);
  }

}
