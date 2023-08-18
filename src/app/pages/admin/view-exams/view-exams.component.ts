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

  deleteExam(id: number){
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estas seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.examSvc.deleteExam(id).subscribe((data: any) =>{
          this.exams = this.exams.filter((exam: Exam) => exam.id !== id);
          Swal.fire('Examen eliminado', 'El examen ha sido eliminado de la base de datos', 'success');
        },(error)=>{
          Swal.fire('Error', 'Error al eliminar exmaen', 'error');
        });
      }
    });
  }

}
