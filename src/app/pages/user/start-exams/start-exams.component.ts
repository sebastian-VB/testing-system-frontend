import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-exams',
  templateUrl: './start-exams.component.html',
  styleUrls: ['./start-exams.component.css']
})
export class StartExamsComponent implements OnInit{

  examId: number;
  questions: Question[];

  constructor(private locationSt: LocationStrategy, private questionSvc: QuestionService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.preventBackButton();
    this.examId = this.route.snapshot.params['examId'];
    this.loadQuestion();
  }

  loadQuestion(){
    this.questionSvc.listQuestionByExam(this.examId).subscribe(
      (data: Question[]) =>{
        this.questions = data;
        console.log(this.questions);
      }, 
      (error) =>{
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas del examen','error');
      }
    );
  }

  preventBackButton(): void{
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, null!, location.href);
    })
  }

}
