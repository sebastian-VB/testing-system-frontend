import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catgeory } from 'src/app/models/category';
import { Exam, ExamPost } from 'src/app/models/exam';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit{

  examId: number = 0;
  exam: Exam;
  examPost: ExamPost;
  categories: Catgeory[];

  constructor(private route: ActivatedRoute, private examSvc: ExamService, private categorySvc: CategoryService, private router: Router){}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examSvc.getExam(this.examId).subscribe((data: Exam) =>{
      this.exam = data;
      console.log(this.exam);
    }, (error)=>{
      console.log(error);
    });

    this.categorySvc.listCategories().subscribe((data: Catgeory[]) =>{
      this.categories = data;
    }, (error)=>{
      console.log(error);
    });

  }

  updateData(): void{

    this.examPost = {
      id: this.exam.id,
      title: this.exam.title,
      description: this.exam.description,
      maxPoints: this.exam.maxPoints,
      questionNumber: this.exam.questionNumber,
      active: this.exam.active,
      category: {
        id: this.exam.category.id
      }
    }

    this.examSvc.updateExam(this.examPost).subscribe((data: Exam)=>{
      Swal.fire('Examen actualizado', 'El examen ha sido actualizado con éxito', 'success').then((e)=>{
        this.router.navigate(['/admin-dashboard/exams']);
      });
    }, (error)=>{
      console.log(error);
      Swal.fire('Error en el sistema', 'No se ha podido actualizar el examen', 'error');
    });

  }

}
