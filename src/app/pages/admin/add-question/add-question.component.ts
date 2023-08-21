import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionPost } from 'src/app/models/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  examId: number;
  title: string;
  questionData: QuestionPost;

  constructor(private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.initialValues();
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.questionData.exam['id'] = this.examId;
  }

  initialValues(): void{
    this.questionData = {
      id: 0,
      content: '',
      image: '',
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
