import { Component } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent {

  exams: any;

  constructor(private examSvc: ExamService){}

}
