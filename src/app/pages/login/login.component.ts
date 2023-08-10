import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { TokenInfo } from 'src/app/models/token';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: Login = {
    "username": '',
    "password": ''
  }

  constructor(private snack: MatSnackBar, private loginSvc: LoginService, private router: Router){}

  formSubmit(): void{
    
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.showSnack('El nombre de usuario es requerido!');
      return ;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.showSnack('La contraseña del usuario es requerida!');
      return ;
    }

    this.tokenAndLogin();

  }

  showSnack(textSnack: string): void{
    this.snack.open(textSnack, 'Aceptar', { duration: 3000 });
  }

  tokenAndLogin(): void{
    this.loginSvc.generateToken(this.loginData).subscribe((token: TokenInfo) => {
      console.log(token);

      this.loginSvc.loginUser(token);
      this.loginSvc.getCurrentUser().subscribe((user: any) =>{
        this.loginSvc.setUser(user);
        console.log(user);

        if(this.loginSvc.getUserRole() == "ADMIN"){
          this.router.navigate(['admin-dashboard']);
          this.loginSvc.loginStatusSubject.next(true);
        }
        else if(this.loginSvc.getUserRole() == "NORMAL"){
          this.router.navigate(['user-dashboard']);
          this.loginSvc.loginStatusSubject.next(true);
        }
        else{
          this.loginSvc.logout();
        }

      });

    }, (error) => { 
      console.log(error);
      this.showSnack("Detalles inválidos, vuelva a intentarlo");
    });
  }

}
