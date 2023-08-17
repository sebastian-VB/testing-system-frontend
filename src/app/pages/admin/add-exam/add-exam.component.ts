import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Catgeory } from 'src/app/models/category';
import { Exam, ExamPost } from 'src/app/models/exam';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{

  categories: Catgeory[];
  examData: ExamPost;

  constructor(
    private categorySvc: CategoryService, 
    private snack: MatSnackBar,
    private examSvc: ExamService,
    private router: Router){}
  
  ngOnInit(): void {
    this.initialValues();
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

    this.examSvc.saveExam(this.examData).subscribe((data: Exam) =>{
      console.log(data);
      Swal.fire('Examen guardado', 'El examen se ha guardadi con éxito', 'success');
      this.initialValues();
      this.router.navigate(['/admin-dashboard/exams']);
    }, (error) =>{
      console.log(error);
      Swal.fire('Error', 'Error al guardar el examen', 'error');
    });

  }

  initialValues(): void{
    this.examData = {
      id: 0,
      title: '',
      description: '',
      maxPoints: '',
      questionNumber: '',
      active: true,
      category: {
        id: 0
      }
    };
  }

}
