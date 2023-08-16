import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit{

  exams: Exam[];

  constructor(private examSvc: ExamService){}

  ngOnInit(): void {
    this.examSvc.listExams().subscribe((data: Exam[]) =>{
      this.exams = data;
      console.log(this.exams);
    },
    (error) =>{
      console.log(error);
      Swal.fire('Error', 'Error al cargar los exámenes', 'error');
    });
  }

}
