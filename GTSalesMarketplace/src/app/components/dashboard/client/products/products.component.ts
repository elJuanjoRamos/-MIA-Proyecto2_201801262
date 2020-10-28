import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { LikeService } from '../../../../services/like.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  arrayProductos:any
  idUser:any;
  like:string = "https://pngimage.net/wp-content/uploads/2018/06/wishlist-icon-png-3.png";
  localUrl:string = "https://static.thenounproject.com/png/635650-200.png";
  resultado: boolean = false;
  searchText;
  constructor(private service:ProductService, private likesevice: LikeService, private router: Router) { 
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
  }
  likeOrNot(id): boolean{
    var data = {
      'idperson' : this.idUser,
      'idproduct': id
    }
    this.likesevice.getLike(data).subscribe(d => {
      var result:any = d
      return result.likes 
    })
    return false
  }

  addlike(id){
    var data = {
      'idperson' : this.idUser,
      'idproduct': id
    }
    this.likesevice.getLike(data).subscribe(d => {
      var result:any = d
      if (!result.likes) {
        this.service.post(data).subscribe(dd =>{
          
        })
      }
    })
  }



  detalles(id:any){
    this.router.navigate(['dashboard/client/products/', id]);
  }

}
