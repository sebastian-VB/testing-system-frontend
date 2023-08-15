import { Component, OnInit } from '@angular/core';
import { Catgeory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  categories: Catgeory[];

  constructor(private categorySvc: CategoryService){}
  
  ngOnInit(): void {
    this.categorySvc.listCategories().subscribe((data: Catgeory[]) => {
      this.categories = data;
      console.log(this.categories);
    }, (error) =>{
      console.log(error);
      Swal.fire('Error', 'Error al cargar las categorias', 'error');
    });
  }


}
