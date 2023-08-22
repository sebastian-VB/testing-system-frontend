import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  questionId: number;
  title: string
  questionData: Question;

  constructor(private route: ActivatedRoute, private router: Router, private questionSvc: QuestionService){}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.questionSvc.getOnlyQuestion(this.questionId).subscribe((data: Question) =>{
      this.title = data.exam.title;
      this.questionData = data;
      console.log(this.questionData);
    }, (error) =>{
      console.log(error);
    });
  }

  updateDataOfQuestion(){
    this.questionSvc.updateQuestion(this.questionData).subscribe((data: Question) =>{
      Swal.fire('Pregunta actualizada', 'La pregunta a sido actualizada con éxito', 'success').then(e => {
        this.router.navigate(['/admin-dashboard/view-question/' + this.questionData.exam.id + '/' + this.questionData.exam.title]);
      });
    })
  }

}
