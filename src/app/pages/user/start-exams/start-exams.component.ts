import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answers } from 'src/app/models/answers';
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
  isSent: boolean = false;
  timer: number;

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

        this.timer = this.questions.length * 2 * 60;

        this.startTimer();
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
        this.evaluateTest();
      }
    });
  }

  evaluateTest(){

    this.questionSvc.evaluateExam(this.questions).subscribe(
      (data: Answers) =>{
        this.correctQuestions = data.correctQuestion;
        this.pointsAchieved = data.maxPoints;
        this.attempts = data.attempts;
        this.isSent = true;
        this.timer = 0;
      },
      (error) =>{
        console.log(error);
      }
    );

    // this.isSent = true;
    // this.questions.forEach((q: Question) =>{
      
    //   if(q.givenAnswer == q.answer){
    //     this.correctQuestions ++;
    //     let pointByQuestion = (+q.exam.maxPoints) / (+q.exam.questionNumber);
    //     this.pointsAchieved += pointByQuestion;
    //   }

    //   if(q.givenAnswer.trim() !== '') this.attempts ++;

    // });
    // console.log('Respuestas correctas: ' + this.correctQuestions);
    // console.log('Puntos conseguidos: ' + this.pointsAchieved);
    // console.log(this.questions);
  }

  startTimer(){
    let t = window.setInterval(()=> {
      if(this.timer <= 0){
        this.evaluateTest();
        clearInterval(t);
      }
      else{
        if(!this.isSent) this.timer --;
      }
    }, 1000);
  }

  getFormatterTime(): string{
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} : seg`;
  }

  printPage(){
    window.print();
  }

  preventBackButton(): void{
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, null!, location.href);
    })
  }

}
