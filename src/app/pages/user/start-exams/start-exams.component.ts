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
  pointsAchieved: number = 0;
  correctQuestions: number = 0;
  attempts: number = 0;

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
        //console.log(this.questions);
      }, 
      (error) =>{
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas del examen','error');
      }
    );
  }

  sendTest(){
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then((result) => {
      if(result.isConfirmed){
        this.questions.forEach((q: Question) =>{
          if(q.givenAnswer == q.answer){
            this.correctQuestions ++;
            let pointByQuestion = (+q.exam.maxPoints) / (+q.exam.questionNumber);
            this.pointsAchieved += pointByQuestion;
          }
        });

        console.log('Respuestas correctas: ' + this.correctQuestions);
        console.log('Puntos conseguidos: ' + this.pointsAchieved);
        console.log(this.questions);
      }
    });
  }

  preventBackButton(): void{
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, null!, location.href);
    })
  }

}
