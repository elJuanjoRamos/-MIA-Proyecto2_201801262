import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  arrayProductos: any;
  idUsr: any;
  constructor(private service: ProductService, private router: Router) {
    this.inicializar();
  }

  ngOnInit(): void {
  }


  inicializar() {
    this.idUsr = localStorage.getItem('id');
    this.service.getAll(this.idUsr).subscribe(arg =>
      this.arrayProductos = arg

      );

  }

  insertar(){
    this.router.navigate(['dashboard/client/myproducts/', 'gestion']);
  }

  delete(id:any){
    this.service.delete(id).subscribe(res =>{
      this.inicializar()
    });
  }

  update(id:any){
    this.router.navigate(['dashboard/client/myproducts/', id]);
  }
}
