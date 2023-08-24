import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  examId: number;
  exam: Exam;

  constructor(private route: ActivatedRoute, private examSvc: ExamService, private router: Router){}
  
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
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

  startExam(){
    Swal.fire({
      title: '¿Quieres comenzar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Empezar',
      icon: 'info'
    }).then((result) =>{
      if(result.isConfirmed){
        this.router.navigate([`/start/${this.examId}`]);
      }
    });
  }

}
