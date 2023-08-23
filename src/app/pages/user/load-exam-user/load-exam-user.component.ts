import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-load-exam-user',
  templateUrl: './load-exam-user.component.html',
  styleUrls: ['./load-exam-user.component.css']
})
export class LoadExamUserComponent implements OnInit{
  
  categoryId: number;
  exams: Exam[];

  constructor(private router: ActivatedRoute, private examSvc: ExamService){}

  ngOnInit(): void {
    // this.categoryId =  this.router.snapshot.params['categoryId'];

    //para poder obtener el valor de un parametro que esta cambiando y no es estatico en la url, es necesario usar el subscribe
    //cada que el valor cambie, se estara escuchando para recibir el nuevo valor
    this.router.params.subscribe((params) =>{
      this.categoryId = params['categoryId'];
      
      if(this.categoryId == 0){
        console.log('Cargando todos los exámenes');
        this.examSvc.listExams().subscribe(
          (data: Exam[]) =>{
            this.exams = data;
            console.log(this.exams);
          },
          (error) =>{
            console.log(error)
          }
        );
      }
      else{
        console.log('Cargando un examen en especifico');
        this.examSvc.listExamByCategory(this.categoryId).subscribe(
          (data: Exam[]) =>{
            this.exams= data;
            console.log(this.exams);
          },
          (error)=>{
            console.log(error)
          }
        );
      }

    });

  }

}
