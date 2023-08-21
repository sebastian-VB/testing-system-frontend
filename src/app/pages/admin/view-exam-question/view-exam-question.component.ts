import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-question',
  templateUrl: './view-exam-question.component.html',
  styleUrls: ['./view-exam-question.component.css']
})
export class ViewExamQuestionComponent implements OnInit{

  examId: number;
  title: string;
  questions: Question[];

  constructor(private route: ActivatedRoute, private questionSvc: QuestionService, private snack: MatSnackBar){}
  
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];

    this.questionSvc.listExamQuestion(this.examId).subscribe((data: Question[]) => {
      this.questions = data;
      console.log(this.questions);
    }, (error) =>{
      console.log(error);
    });

  }

  deleteQuestion(questionId: number){
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estas seguro de eliminar la pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.questionSvc.deleteQuestion(questionId).subscribe((data) =>{
          this.questions = this.questions.filter((q: Question) => q.id != questionId);
          this.snack.open('Pregunta eliminada 👍', 'Aceptar', {duration: 3000});
        }, (error) =>{
          console.log(error);
          this.snack.open('Error al eliminar la pregunta 😓', 'Aceptar', {duration: 3000});
        });
      }
    });
  }

}
