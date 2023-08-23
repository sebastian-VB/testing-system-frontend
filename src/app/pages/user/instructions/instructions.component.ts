import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  examId: number;
  exam: Exam;

  constructor(private router: ActivatedRoute, private examSvc: ExamService){}
  
  ngOnInit(): void {
    this.examId = this.router.snapshot.params['examId'];
    this.examSvc.getExam(this.examId).subscribe(
      (data: Exam) =>{
        this.exam = data;
        console.log(this.exam);
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
