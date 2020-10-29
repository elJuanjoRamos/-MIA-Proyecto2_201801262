import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { LikeService } from '../../../../services/like.service';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  arrayProductos:any
  arrayCategorias:any;
  idUser:any;
  like:string = "https://pngimage.net/wp-content/uploads/2018/06/wishlist-icon-png-3.png";
  localUrl:string = "https://static.thenounproject.com/png/635650-200.png";
  resultado: boolean = false;
  searchText;
  constructor(private service:ProductService, private catsetvice: CategoryService, 
    private router: Router) { 
    this.inicializar()
  }

  ngOnInit(): void {
    
  }
  inicializar(){
    this.idUser = localStorage.getItem('id');
    this.service.getAll2(this.idUser).subscribe(data =>{
      console.log(data)
      this.arrayProductos = data;
    });
    this.catsetvice.getAll().subscribe(data =>{
      this.arrayCategorias = data;
    })
  }



  detalles(id:any){
    this.router.navigate(['dashboard/client/products/', id]);
  }


  onChangePrice(value:any) {
    if (value == 'NOR') {
      this.inicializar()
    } else{
      this.service.getProductByPrice(value).subscribe(data=>{
        this.arrayProductos = data;
      });
    }
  }
  onChangeCategory(value:any) {
    if (value == 0) {
      this.inicializar()
    } else {
      this.service.getProductByCategory(value).subscribe(data=>{
        this.arrayProductos = data;
      });
    }
  }
}
