import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Catgeory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: Catgeory = {
    id: 0,
    title: '',
    description: ''
  };

  constructor(private categorySvc: CategoryService, private snack: MatSnackBar, private router: Router){}

  formSubmit(){
    
    if(this.category.title.trim() === '' || this.category.title === null){
      this.snack.open("El titutlo es requerido!!", '',{duration: 3000});
      return ;
    }

    this.categorySvc.addCategory(this.category).subscribe((data: Catgeory) => {
      this.category.title = '';
      this.category.description = '';
      Swal.fire('Categoría agregada', 'La categoría ha sido agregada con éxito', 'success');
      this.router.navigate(['/admin-dashboard/categories']);
    }, (error) =>{
      console.log(error);
      Swal.fire('Error!!', 'Error al guardar la categoría', 'error');
    });

  }

}
