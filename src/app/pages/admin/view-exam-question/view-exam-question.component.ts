import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-exam-question',
  templateUrl: './view-exam-question.component.html',
  styleUrls: ['./view-exam-question.component.css']
})
export class ViewExamQuestionComponent implements OnInit{

  examId: number;
  title: string;
  questions: Question[];

  constructor(private route: ActivatedRoute, private questionSvc: QuestionService){}
  
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

}
