import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Catgeory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  categories: Catgeory[];

  constructor(private categorySvc: CategoryService, private snack: MatSnackBar){}

  ngOnInit(): void {
    this.categorySvc.listCategories().subscribe(
      (data: Catgeory[]) =>{
        this.categories = data;
      },
      (error) =>{
        console.log(error);
        this.snack.open('Error al cargar la categoría 😓', 'Aceptar', {duration: 3000});
      }
    );
  }

}
