import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  formGroup: FormGroup;

  constructor(private userSvc: UserService, private fb: FormBuilder, private snack: MatSnackBar){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.formGroup = this.fb.group({
      username: '',
      password: '',
      name: '',
      lastname: '',
      email: '',
      phone: ''
    });
  }

  formSubmit(): void{
    if(this.formGroup.value['username'] == '' || this.formGroup.value['username'] == null){
      //este componente se saca de angular material
      this.snack.open("El nombre de usuario es requerido!!", 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return ;
    }

    this.userSvc.addUser(this.formGroup.value).subscribe((data) => {
      console.log(data);
      //este componente se instala con npm
      Swal.fire("Usuario guardado", "Usuario registado con éxito en el sistema","success");

    },(error) => {
      console.log(error);
      this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
        duration: 3000,
      });
    });
  }


}
