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
    this.categoryId =  this.router.snapshot.params['categoryId'];
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

    }
  }

}
