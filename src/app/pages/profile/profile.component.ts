import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: any;

  constructor(private loginSvc: LoginService){}
  
  ngOnInit(): void {
    this.user = this.loginSvc.getUser();
  }



}
