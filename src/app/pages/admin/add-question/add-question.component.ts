import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionPost } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  examId: number;
  title: string;
  questionData: QuestionPost;

  constructor(private route: ActivatedRoute, private questionSvc: QuestionService, private snack: MatSnackBar){}
  
  ngOnInit(): void {
    this.initialValues();
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.questionData.exam['id'] = this.examId;

  }

  formSubmit(): void{
    
    if(this.validInputs() == false){
      this.snack.open('Se necesita llenar todos los campos 😁', 'Aceptar');
      return ;
    }

    this.questionSvc.saveQuestion(this.questionData).subscribe((data: Question)=>{
      Swal.fire('Pregunta guardada', `Pregunta añadida con éxito a ${this.title}`, 'success');
      this.initialValues();
    }, (error)=>{
      console.log(error);
      Swal.fire('Error', 'Error al guardar la pregunta', 'error');
    });
  }

  validInputs(): boolean{
    if(this.questionData.content.trim() == '' || this.questionData.content == null){
      return false;
    }
    if(this.questionData.option1.trim() == '' || this.questionData.option1 == null){
      return false;
    }
    if(this.questionData.option2.trim() == '' || this.questionData.option2 == null){
      return false;
    }
    if(this.questionData.option3.trim() == '' || this.questionData.option3 == null){
      return false;
    }
    if(this.questionData.option4.trim() == '' || this.questionData.option4 == null){
      return false;
    }
    if(this.questionData.answer.trim() == '' || this.questionData.answer == null){
      return false;
    }

    return true;
  }

  initialValues(): void{
    this.questionData = {
      id: 0,
      content: '',
      image: 'image.png',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      exam: {
        id: 0
      }
    }
  }

}
