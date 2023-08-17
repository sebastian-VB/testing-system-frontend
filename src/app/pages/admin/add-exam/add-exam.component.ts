import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Catgeory } from 'src/app/models/category';
import { ExamPost } from 'src/app/models/exam';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{

  categories: Catgeory[];
  examData: ExamPost = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '',
    questionNumber: '',
    active: false,
    category: {
      id: 0
    }
  };

  constructor(private categorySvc: CategoryService, private snack: MatSnackBar){}
  
  ngOnInit(): void {
    this.categorySvc.listCategories().subscribe((data: Catgeory[]) => {
      this.categories = data;
      console.log(this.categories);
    }, (error) =>{
      console.log(error);
      Swal.fire('Error', 'Error al cargar las categorias', 'error');
    });
    
  }


  formSubmit(): void{
    console.log(this.examData);
    if(this.examData.title.trim() === '' || this.examData.title === null){
      this.snack.open('El título es requerido','Aceptar', {duration: 3000});
      return ;
    }

  }

}
