import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-acategory',
  templateUrl: './acategory.component.html'
})
export class AcategoryComponent implements OnInit {

  arrayCategorias = [];
  constructor(private service: CategoryService) {
      this.inicializar();
   }

  ngOnInit(): void {
  }


  inicializar( ) {
    this.service.getAll().subscribe(data => {
        this.arrayCategorias = data;
    });
  }

  save(name:string){
    var category = {
      "name": name
    }
    this.service.post(category).subscribe(res=> {
      this.inicializar();
    });
  }

  delete(id:any){
    this.service.delete(id).subscribe(res =>{
       this.inicializar();
    });
  }
}
